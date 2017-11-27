var express = require('express');
var router = express.Router();

const db_connection = require('../DB_Connnection').db_connection;
const sql = require('../DB_Connnection').sql;

let Loan = require('../models/Loan');

router.get('/', function (req, res, next) {
    db_connection.then(pool => {
        console.log("conecto");
        return pool.request().execute('showLoans');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar morosidades' + err);
    });
});


function popullateLoanPool(pool, req) { 
    let loan = req.body;
    

    if(loan.peopleLicenseOrId.length == 6){
        loan.idType = 1; //Type 1 quiere decir estudiante
    }else if (loan.peopleLicenseOrId.length == 10){
        loan.idType = 2; //Type 2 quiere decir funcionario
    }
    //Crea startDate
    let starDate = new Loan('actual','');
    let finishDate = new Loan('end',loan.endDate);

    pool.input('peopleLicenseOrId', sql.NVarChar(50), loan.peopleLicenseOrId).
    input('startDate', sql.DateTime, starDate.date).
    input('finishDate', sql.DateTime, finishDate.date).
    input('barcode', sql.NVarChar(50), loan.barcode).
    input('idType', sql.Int, loan.idType);

};

// insert a new Loan
router.post('/loan', function (req, res, next) {
    db_connection.then(pool => {
        let poolRequest = pool.request();
        popullateLoanPool(poolRequest, req);
        return poolRequest.execute('createLoan');
    }).then(result => {
        res.send('loan created ' + result.output);
        console.log(result.output);
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
        console.log(err);
    });

    
    
});

// //Return loan item
router.put('/return', function (req, res, next) {
    console.log('return');
    db_connection.then(pool => {
        return pool.request().
            input('barcode', sql.NVarChar(50), req.body.barcode).
            execute('returnLoan');
    }).then(result => {
        res.send('equipment returned succesffuly' + result.output);
        console.log(result.output)
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
        console.log(err)
    });
});

// //renew the loan 
router.put('/renew', function (req, res, next) {
    console.log('renew');
    let endDate = new Loan('end',req.body.endDate)
    db_connection.then(pool => {
        return pool.request().
            input('barcode', sql.NVarChar(50), req.body.barcode).
            input('newFinishDate', sql.DateTime, endDate.date).
            execute('renewLoan');
    }).then(result => {
        res.send('equipment renewed succesffuly' + result.output);
        console.log(result.output)
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
        console.log(err)
    });
});


module.exports = router;