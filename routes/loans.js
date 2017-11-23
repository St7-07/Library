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
    let validateLoan = new Loan(loan.loanDate, loan.returnDate, loan.returnedDate, loan.state);
    db_Connection.then(pool => {
        return pool.request().
            input('id_user', sql.SmallInt, loan.userId).
            input('loanDate', sql.DateTime, validateLoan.loanDate).
            input('returnDate', sql.DateTime, validateLoan.returnDate).
            input('id_av_equipment', sql.SmallInt, loan.avEquipmentId).
            input('id_people', sql.SmallInt, loan.peopleID).
            input('returnedDate', sql.DateTime, validateLoan.returnedDate).
            input('state', sql.bit, validateLoan.state).
            output('ID', sql.INT).
            execute('createLoan');
    }).then(result => {
        res.send('loan created ' + result.output);
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
    });
});
//ask if you can do tha shit nigga
router.put('/loan/:returnedDate', function (req, res, next) {
    let returnedDate = req.body.date;
    db_Connection.then(pool => {
        return pool.request().
            input('returnedDate', sql.DateTime, new Date(returnedDate)).
            output('ID', sql.INT).
            output('state', sql.bit).
            execute('returnItem');
    }).then(result => {
        res.send('equipment returned succesffuly' + result.output);
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
    });
});

module.exports = router;