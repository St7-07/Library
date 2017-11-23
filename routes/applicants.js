var express = require('express');
var router = express.Router();
var Student = require('../models/Student');
var Person = require('../models/Person');
var Clerk = require('../models/Clerk');
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

function popullatePersonPool(pool, req) {
    let applicant = req.body;
    //This is the applicant for the person object
    let person = new Person(applicant.identification, applicant.name, applicant.lastname,
                  applicant.email, applicant.tel, applicant.cel, applicant.expireDate,
                  applicant.districtID, applicant.signals, applicant.locationID);
                  console.log(person.expireDate);
                  console.log(person.identification);
                  console.log(person.name);
                  console.log(person.cel);
    pool.input('identification',sql.Int, person.identification)
        .input('name', sql.NVarChar(50),person.name)
        .input('lastname', sql.NVarChar(50), person.lastname)
        .input('email', sql.NVarChar(50), person.email)
        .input('tel', sql.NVarChar(15), person.tel)
        .input('cel', sql.NVarChar(15), person.cel)
        .input('expireDate', sql.DateTime, person.expireDate)
        .input('ID_district', sql.SmallInt, person.district)
        .input('signals', sql.NVarChar(10), person.signals)
        .input('locationID', sql.SmallInt, person.locationID);
};
  /*
  Create and save a student
  */
  router.post('/student', function(req, res, next) {
    let student = req.body;
    let validatedStudent = new Student(student.studentID, student.career);
    //Send to database the person validating data
    DB_Connnection.then(pool => {
       let poolRequest = pool.request();
        popullatePersonPool(poolRequest, req);
        return poolRequest.input('studentID', sql.VarChar(10), validatedStudent.studentID)
            .input('career', sql.NVarChar(50), validatedStudent.career)
            .output('ID', sql.Int)
            .execute('createStudent');
      }).then(result => {
          res.send("User created: " + result.output);
      }).catch(err => {
          res.send('Fallo al ejecutar procedimiento.' + err);
     });
  });
//this made the update of the student
router.put('/student', function(req, res, next) {
  let ID = req.body.ID;
  let student = req.body;
  let validatedStudent = new Student(student.studentID, student.career);
  //Send to database the person validating data
  DB_Connnection.then(pool => {
     let poolRequest = pool.request();
      popullatePersonPool(poolRequest, req);
      return poolRequest.input('career', sql.NVarChar(50), validatedStudent.career)
          .input('studentID', sql.VarChar(10), validatedStudent.studentID)
          .input('ID', sql.Int, ID)
          .execute('updateStudent');
    }).then(result => {
        res.send("User updated: " + ID);
    }).catch(err => {
        res.send('Fallo al ejecutar procedimiento.' + err);
   });
});

//delete an studen ENVIAR EL CARNET
router.delete('/student/:id', function(req, res, next) {
    DB_Connnection.then(pool => {
      console.log(req.params.id);
      return pool.request()
        .input('studentLicense', sql.NVarChar, req.params.id)
        .execute('deleteStudent');
    }).then(result => {
        res.send("Student deleted: " + req.params.id);
    }).catch(err => {

        res.send(err);
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
// router.post('/clerk', function(req, res, next) {
// let clerk = req.body;
// let validateClerk = new Clerk(clerk.department,clerk.position)   
// let applicant = req.body;
// //This is the applicant for the person object
// let person = new Person(applicant.identification, applicant.name, applicant.lastname,
//               applicant.email, applicant.tel, applicant.cel, applicant.expireDate,
//               applicant.districtID, applicant.signals, applicant.locationID); 

//  DB_Connnection.then(pool => {
//       return pool.request()
//         .input('identification',sql.NVarChar(50), person.identification)
//         .input('name', sql.NVarChar(50),person.name)
//         .input('lastname', sql.NVarChar(50), person.lastname)
//         .input('email', sql.NVarChar(50), person.email)
//         .input('tel', sql.NVarChar(15), person.tel)
//         .input('cel', sql.NVarChar(15), person.cel)
//         .input('expireDate', sql.DateTime, person.expireDate)
//         .input('ID_district', sql.SmallInt, person.districtID)
//         .input('signals', sql.NVarChar(50), person.signals)
//         .input('locationID', sql.SmallInt, person.locationID)
//         .input('department', sql.NVarChar(50), validateClerk.department)
//         .input('position', sql.VarChar(50), validateClerk.position)
//         .output('ID', sql.Int)
//         .execute('createClerk');
//       }).then(result => {
//           res.send("User created: " + result.output);
//       }).catch(err => {
//           res.send('Fallo al ejecutar procedimiento.' + err);
//      });
//   });
//create the new clerk 
router.post('/clerk', function(req, res, next) {
    let clerk = req.body;
    let validateClerk = new Clerk(clerk.department, clerk.position);
    //Send to database the person validating data
    DB_Connnection.then(pool => {
       let poolRequest = pool.request();
        popullatePersonPool(poolRequest, req);
        return poolRequest.input('department', sql.NVarChar(50), validateClerk.position)
            .input('position', sql.VarChar(50), validateClerk.position)
            .output('ID', sql.Int)
            .execute('createClerk');
      }).then(result => {
          res.send("clerk created: " + result.output);
      }).catch(err => {
          res.send('Fallo al ejecutar procedimiento.' + err);
     });
  });
 //update the clerk 

router.put('/clerk', function(req, res, next) {
  let ID = req.body.ID;
  let clerk = req.body;
  let validateClerk = new Student(clerk.department, clerk.position);
  //Send to database the person validating data
  DB_Connnection.then(pool => {
     let poolRequest = pool.request();
      popullatePersonPool(poolRequest, req);
      return poolRequest.input('department', sql.NVarChar(50), validateClerk.department)
          .input('position', sql.VarChar(50), validateClerk.position)
          .input('ID', sql.Int, ID)
          .execute('updateClerk');
    }).then(result => {
        res.send("clerk updated: " + ID);
    }).catch(err => {
        res.send('Fallo al ejecutar procedimiento.' + err);
   });
});

// delete clerk ENVIAR la cedula
  router.delete('/clerk/:id', function(req, res, next) {
    DB_Connnection.then(pool => {
      return pool.request()
        .input('ID', sql.Int, req.params.id)
        .execute('deleteClerk');
    }).then(result => {
        res.send("Clerk deleted: " + req.params.id);
    }).catch(err => {
        res.send("Clerk couldn't be deleted");
    });
});




module.exports = router;
