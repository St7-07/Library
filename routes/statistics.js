var express = require('express');
var router = express.Router();
const db_connection = require('../DB_Connnection').db_connection;
const sql = require('../DB_Connnection').sql;

router.get('/:id', function(req, res, next) {
    db_connection.then(pool => {
        return pool.request()
        .input('categoryId', sql.Int, req.params.id)
        .execute('calculateStatistics');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send("Error al conectar con Base de datos.");
    });
  });

module.exports = router;