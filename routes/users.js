var express = require('express');
var router = express.Router();

const db_connection = require('../DB_Connnection').db_connection;
const sql = require('../DB_Connnection').sql;

let User =  require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.writeHead(200,{'Content-Type':'application/json'});
  //connect to db to get users instead
  db_connection.then(pool => {
      // Stored procedure
    return pool.request().execute('showUsers');
  }).then(result => {
      res.send(result.recordsets[0]);
  }).catch(err => {
      res.send('Fallo al recuperar usuarios.' + err);
  });
});

router.post('/user', function(req, res, next) {
  let user = req.body;
  let validatedUser = new User(user.id,user.username,user.password,user.tipo,user.estado,user.mail,user.name);
  db_connection.then(pool => {
      return pool.request()
      .input('UserName', sql.VarChar(50), validatedUser.id)
      .input('Password', sql.VarChar(50), validatedUser.password)
      .input('type', sql.Bit, validatedUser.type)
      .input('state', sql.VarChar(50), validatedUser.state)
      .input('email', sql.VarChar(50), validatedUser.email)
      .input('Name', sql.VarChar(50), validatedUser.name)
      .output('ID', sql.Int)
      .execute('createUser');
  }).then(result => {
      res.send(result.output);
  }).catch(err => {
    // ... error checks
      res.send("Error to post user");
  });
});

/*
router.put('/user/:id', function(req, res, next) {
  return pool.request()
  .input('input_parameter', sql.Int, value)
  .output('output_parameter', sql.VarChar(50))
  .execute('procedure_name')
}).then(result => {
  console.dir(result)
}).catch(err => {
  // ... error checks

  res.send("You are updating user: " + req.params.id);
});*/

router.delete('/user/:id', function(req, res, next) {
  let id = req.params.id;
  db_connection.then(pool => {
      return pool.request()
      .input('id', sql.SmallInt, id)
      .output('ID', sql.SmallInt)
      .execute('deleteUser');
  }).then(result => {
    console.dir(result)
  }).catch(err => {
    // ... error checks
    res.send("You are deleting user: " + req.params.id);
  });
});

/*Validate user for login
  @param user {username, password}
*/
router.post('/validate', function(req, res, next) {
  db_connection.then(pool => {
    return pool.request()
    .input('username_email',sql.NVarChar(50), req.body.username )
    .input('password', sql.NVarChar(50), req.body.password)
    .output('valid', sql.Bit, 0)
    .execute('validateUser');
  }).then(result => {
      res.send(result.output);
  }).catch(err => {
      res.send('Fallo al ejecutar procedimiento.' + err);
  });
});
//restore password
router.post('/restorePassword', function(req, res, next) {
  db_connection.then(pool => {
    return pool.request()
    .input('userName',sql.NVarChar(50), req.body.username )
    .output('pass', sql.NVarChar(50), "")
    .execute('returnPass');
  }).then(result => {
      res.send(result.output);
  }).catch(err => {
      res.send('Fallo al ejecutar procedimiento.' + err);
  });
});

router.put('/pass', function(req, res, next) {
    db_connection.then(pool => {
      return pool.request()
        .input('username',sql.NVarChar(50), req.body.username)
        .output('pass', sql.NVarChar(50), req.body.password)
        .execute('updatePass');
  }).then(result => {
    
      res.send(result);
  }).catch(err => {
      res.send('Fallo al ejecutar procedimiento.' + err);
  });
});

module.exports = router;
