var express = require('express');
var router = express.Router();

const db_connection = require('../DB_Connnection').db_connection;
const sql = require('../DB_Connnection').sql;

const IdentifierType = require("../models/IdentifierType");
const Loan = require('../models/Loan');

router.get('/', function (req, res, next) {
    db_connection.then(pool => {
        console.log("conecto");
        return pool.request().execute('showDelinquencies');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar morosidades' + err);
    });
});

router.get('/studentsLicense', function (req, res, next) {

    db_connection.then(pool => {
        console.log("conecto");
        return pool.request()
        .execute('showDelinquenciesStudentsLicense');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar morosidades' + err);
    });
});

router.get('/identifications', function (req, res, next) {
        db_connection.then(pool => {
            console.log("conecto");
            return pool.request()
            .execute('showDelinquenciesIdentifications');
        }).then(result => {
            res.send(result.recordsets[0]);
        }).catch(err => {
            res.send('fallo al mostrar  morosidades' + err);
        });
    });

router.post('/create', function (req, res, next) {
    let barcode = req.body.barcode;
    let numDays = req.body.numDays;
    let today = new Loan('actual','');
    db_connection.then(pool =>  {
        return pool.request().
           input('barcode', sql.NVarChar(50), barcode).
           input('delqDate', sql.DateTime, today.date).
           input('numDays',sql.Int, numDays).
           execute('createDelinquency');
   }).then(result => {
       res.send('Equipo con retorno tardio, se aplicará morosidad de '+numDays+' dia(s)');
       console.log(result)
   }).catch(err => {
       res.send('fallo al ejecutar el procedimiento ' + err)
       console.log(err)
   });
});

module.exports = router;