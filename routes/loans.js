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
    let validateLoan = new Loan(loan.startDate, loan.finishDate);
    console.log(loan.user_id);
    console.log(loan.AV_id);
    console.log(loan.startDate);
    console.log(loan.finishDate);
    console.log(loan.people_id);
    pool.input('user_id', sql.SmallInt, loan.user_Id).
    input('startDate', sql.DateTime, validateLoan.startDate).
    input('finishDate', sql.DateTime, validateLoan.finishDate).
    input('AV_id', sql.Int, loan.AV_id).
    input('people_id', sql.Int, loan.people_id);
};

// insert a new Loan
router.post('/loan', function (req, res, next) {
    db_connection.then(pool => {
        let poolRequest = pool.request();
        popullateLoanPool(poolRequest, req);
        return poolRequest.execute('createLoan');
    }).then(result => {
        res.send('loan created ' + result.output);
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
    });
});

// //Return loan item
router.put('/return', function (req, res, next) {
    console.log('return');
    db_connection.then(pool => {
        return pool.request().
            input('barcode', sql.VarChar, req.body.barcode).
            execute('returnLoan');
    }).then(result => {
        res.send('equipment returned succesffuly' + result.output);
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
    });
});

// //renew the loan 
router.put('/renew', function (req, res, next) {
    console.log('renew');
    db_connection.then(pool => {
        return pool.request().
            input('barcode', sql.Int, req.body.barcode).
            input('newFinishDate', sql.DateTime, new Date(req.body.newFinishDate)).
            execute('renewLoan');
    }).then(result => {
        res.send('equipment renewed succesffuly' + result.output);
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
    });
});


module.exports = router;