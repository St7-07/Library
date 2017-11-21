const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'root',
    server: 'localhost\\MSSQLSERVER2016', // You can use 'localhost\\instance' to connect to named instance
    database: 'Biblioteca'
   
}

module.exports = {
   db_connection : sql.connect(config),
   sql : sql,
   config : config

};