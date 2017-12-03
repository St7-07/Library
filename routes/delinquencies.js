var express = require('express');
var router = express.Router();

const db_connection = require('../DB_Connnection').db_connection;
const sql = require('../DB_Connnection').sql;

const IdentifierType = require("../models/IdentifierType");

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
            res.send('fallo al mostrar morosidades' + err);
        });
    });

module.exports = router;