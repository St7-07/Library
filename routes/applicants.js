var express = require('express');
var router = express.Router();
var Student = require('../models/Student');
var Person = require('../models/Person');

const DB_Connnection = require('../DB_Connnection').db_connection;
const sql = require('../DB_Connnection').sql;
const config = require('../DB_Connnection').config;

/* Get people listing.
*/
router.get('/', function(req, res, next) {
  //res.writeHead(200,{'Content-Type':'application/json'});
  DB_Connnection.then(pool => {
    return pool.request().execute('showPeople');
  }).then(result => {
      res.send(result.recordsets[0]);
  }).catch(err => {
      res.send('Fallo al ejecutar procedimiento.' + err);
  });
});

/* GET students listing.
*/
router.get('/students', function(req, res, next) {
   
  //res.writeHead(200,{'Content-Type':'application/json'});
  DB_Connnection.then(pool => {
    console.log("conecto");
    return pool.request().execute('showStudents');
  }).then(result => {
      res.send(result.recordsets[0]);
  }).catch(err => {
    console.log(err);
      res.send('Fallo al ejecutar procedimiento.' + err);
  });
});

// /*  
// Create end update store procedur person definition
// */
//   function personStoreProcedure(req) {
//     let applicant = req.body;
//     //This is the applicant for the person object
//     let person = new Person(applicant.identification, applicant.name, applicant.lastname,
//                   applicant.email, applicant.tel, applicant.cel, applicant.expireDate,
//                   applicant.districtID, applicant.signals, applicant.locationID);
//     let initPool;
//     //Send to database the person validating data
//     DB_Connnection.then(pool => {
//       initPool = pool; 
//     });
//     initPool.request()
//     .input('identification',sql.NVarChar(50), person.ID)
//     .input('name', sql.NVarChar(50),person.name)
//     .input('lastname', sql.NVarChar(50), person.lastname)
//     .input('email', sql.NVarChar(50), person.email)
//     .input('tel', sql.NVarChar(15), person.tel)
//     .input('cel', sql.NVarChar(15), person.cel)
//     .input('expireDate', sql.DateTime, person.expireDate)
//     .input('ID_district', sql.SmallInt, person.district)
//     .input('signals', sql.NVarChar(50), person.signals)
//     .input('locationID', sql.SmallInt, person.locationID);
//     return initPool;
// };


//   /*
//   Create and save a student
//   */
//   router.post('/student', function(req, res, next) {
//     let student = req.body;
//     let validatedStudent = new Student(student.studentID, student.career);
//     let initPool = personStoreProcedure(req);
//     DB_Connnection.then(pool => {
//       return initPool.input('career', sql.NVarChar(50), validatedStudent.career)
//       .input('studentID', sql.VarChar(10), validatedStudent.studentID)
//       .output('ID', sql.Int)
//       .execute('updateStudent');
//     }).then(result => {
//               res.send(result.output);
//             }).catch(err => {
//                 res.send('Fallo al ejecutar procedimiento.' + err);
//             });
//   });

    /*
  Create and save a student
  */
  router.post('/student', function(req, res, next) {
    let student = req.body;
    let validatedStudent = new Student(student.studentID, student.career);
    let applicant = req.body;
    //This is the applicant for the person object
    let person = new Person(applicant.identification, applicant.name, applicant.lastname,
                  applicant.email, applicant.tel, applicant.cel, applicant.expireDate,
                  applicant.districtID, applicant.signals, applicant.locationID);
    //Send to database the person validating data
    DB_Connnection.then(pool => {
      return pool.request()
        .input('identification',sql.NVarChar(50), person.identification)
        .input('name', sql.NVarChar(50),person.name)
        .input('lastname', sql.NVarChar(50), person.lastname)
        .input('email', sql.NVarChar(50), person.email)
        .input('tel', sql.NVarChar(15), person.tel)
        .input('cel', sql.NVarChar(15), person.cel)
        .input('expireDate', sql.DateTime, person.expireDate)
        .input('ID_district', sql.SmallInt, person.districtID)
        .input('signals', sql.NVarChar(50), person.signals)
        .input('locationID', sql.SmallInt, person.locationID)
        .input('career', sql.NVarChar(50), validatedStudent.career)
        .input('studentID', sql.VarChar(10), validatedStudent.studentID)
        .output('ID', sql.Int)
        .execute('createStudent');
      }).then(result => {
          res.send("User created: " + result.output);
      }).catch(err => {
          res.send('Fallo al ejecutar procedimiento.' + err);
     });
  });

// router.put('/student', function(req, res, next) {
//   let ID = req.body.ID;
//   let student = new Student(student.studentID, student.career);
//   let request = personStoreProcedure(req);
//   return request.input('career', sql.NVarChar(50), student.career)
//           .input('studentID', sql.VarChar(10), student.studentID)
//           .output('ID', sql.Int)
//           .execute('createStudent').then(result => {
//               res.send(result.output);
//           }).catch(err => {
//               res.send('Fallo al ejecutar procedimiento.' + err);
//           });
// });

router.delete('/student/:id', function(req, res, next) {
    DB_Connnection.then(pool => {
      return pool.request()
        .input('ID', sql.Int, req.params.id)
        .execute('deleteStudent');
    }).then(result => {
        res.send("Student deleted: " + req.params.id);
    }).catch(err => {
        res.send("Student couldn't be deleted");
    });
});

/* GET clerks listing.
*/
router.get('/clerks', function(req, res, next) {
  //res.writeHead(200,{'Content-Type':'application/json'});
  DB_Connnection.then(pool => {
    return pool.request().execute('showClerks');
  }).then(result => {
      res.send(result.recordsets[0]);
  }).catch(err => {
      res.send('Fallo al ejecutar procedimiento.' + err);
  });
});

/*
Create and save a clerk
*/
router.post('/clerk', function(req, res, next) {
  res.send("You are creating:" + req.body.name);
  //call model and then validate and save to db
});

module.exports = router;
