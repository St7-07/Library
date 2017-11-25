var express = require('express');
var router = express.Router();

const db_connection = require('../DB_Connnection').db_connection;
const sql = require('../DB_Connnection').sql;
const config = require('../DB_Connnection').config;

let Loan = require('../models/Loan');



router.get('/', function (req, res, next) {
    db_Connection.then(pool => {
        return pool.request().execute('showLoans');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar equipo' + err);
    });
});
//insert a new Loan
router.post('/loan', function (req, res, next) {
    let loan = req.body;
    let validateLoan = new Loan(loan.startDate, loan.finishDate);
    db_Connection.then(pool => {
        return pool.request().
            input('user_id', sql.SmallInt, loan.userId).
            input('startDate', sql.DateTime, validateLoan.startDate).
            input('finishDate', sql.DateTime, validateLoan.finishDate).
            input('AV_id', sql.Int, loan.AV_id).
            input('people_id', sql.Int, loan.people_id).
            execute('createLoan');
    }).then(result => {
        res.send('loan created ' + result.output);
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
    });
});

//Return loan item
router.put('/loan/', function (req, res, next) {
    db_Connection.then(pool => {
        return pool.request().
            input('barcode', sql.Nvarchar(50), req.body.barcode).
            execute('returnLoan');
    }).then(result => {
        res.send('equipment returned succesffuly' + result.output);
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
    });
});
//renew the loan 
router.put('/loan/renew', function (req, res, next) {
    db_Connection.then(pool => {
        return pool.request().
            input('loan_id', sql.Int, req.body.loan_id).
            input('newFinishDate', sql.DateTime, new Date(req.body.newFinishDate)).
            execute('returnLoan');
    }).then(result => {
        res.send('equipment renewed succesffuly' + result.output);
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
    });
});
module.exports = router;