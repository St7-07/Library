var express = require('express');
var router = express.Router();

const db_connection = require('../DB_Connnection').db_connection;
const sql = require('../DB_Connnection').sql;

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

module.exports = router;