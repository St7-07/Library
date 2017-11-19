const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'root',
    server: 'localhost\\SQLEXPRESS_2016', // You can use 'localhost\\instance' to connect to named instance
    database: 'Biblioteca',
   
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

module.exports = {
   db_connection : sql.connect(config),
   sql : sql
};