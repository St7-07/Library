var express = require('express');
var router = express.Router();
var Av_Equipment = require('../models/Av_equiment');

const DB_Connection = require('../DB_Connnection');
const sql = require('../DB_Connnection');
//show of the av_equipment
router.get('/av_equipments', function (req, res, next) {
    DB_Connection.then(pool => {
        return pool.request().execute('showAv_equipment');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar equipo' + err);
    });
});
//show de los brands , categorys y models que se encuentran en la bd
router.get('/brands', function (req, res, next) {
    DB_Connection.then(pool => {
        return pool.request().execute('showBrand');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar equipo' + err);
    });
});

router.get('/models', function (req, res, next) {
    DB_Connection.then(pool => {
        return pool.request().execute('showModels');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar equipo' + err);
    });
});

router.get('/categorys', function (req, res, next) {
    DB_Connection.then(pool => {
        return pool.request().execute('showCategorys');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar equipo' + err);
    });
});

// insert a new category 
router.put('/category',function (req, res, next){
let category = req.body;
    DB_Connection.then(pool =>{
return pool.request().
input('identification',sql.NVarChar(50), person.identification).
output('ID',sql.INT).
execute('createCategory');
}).then(result =>{
    res.send('category created ' + result.output);
}).catch(err => {
    res.send('fallo al ejecutar el procedimiento ' + err)
});
});

//populate the av_equipment
function popullateAv_equipment(pool, req) {
    let av_equipment = req.body;
    //This is the applicant for the person object
    let validateEquipment = new Av_Equipment(av_equipment.model, av_equipment.brand , av_equipment.category,
        av_equipment.notes,av_equipment.barcode);
    pool.input('model',sql.NVarChar(50), validateEquipment.model)
        .input('brand', sql.NVarChar(50),validateEquipment.brand)
        .input('name', sql.NVarChar(50), validateEquipment.category)
        .input('', sql.NVarChar(50), validateEquipment.notes)
        .input('tel', sql.NVarChar(15), validateEquipment.barcode)
        .input('cel', sql.NVarChar(15), validateEquipment.cel)
};
//insert an av_equipment
router.post('/av_equipment', function(req, res, next) {
   
    //Send to database the person validating data
    DB_Connnection.then(pool => {
       let poolRequest = pool.request();
       popullateAv_equipment(poolRequest, req);
        return poolRequest.output('ID', sql.Int)
        .execute('create_av_equipment');
      }).then(result => {
          res.send("av_equipment created: " + result.output);
      }).catch(err => {
          res.send('Fallo al ejecutar procedimiento.' + err);
     });
  });
  
// modify an av_equipment
  router.put('/av_equipment', function(req, res, next) {
    let ID = req.body.ID;
    //Send to database the person validating data
    DB_Connnection.then(pool => {
       let poolRequest = pool.request();
       popullateAv_equipment(poolRequest, req);
        return poolRequest.execute('update_av_equipment');
      }).then(result => {
          res.send("av_equipment updated: " + result.output);
      }).catch(err => {
          res.send('Fallo al ejecutar procedimiento.' + err);
     });
  });
//
  router.delete('/av_equipment/:id', function(req, res, next) {
    DB_Connnection.then(pool => {
      return pool.request()
        .input('ID', sql.Int, req.params.id)
        .execute('delete_av_equipment');
    }).then(result => {
        res.send("av_equipment deleted: " + req.params.id);
    }).catch(err => {
        res.send("av_equipment couldn't be deleted");
    });
});
