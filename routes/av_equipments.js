var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const db_connection = require('../DB_Connnection').db_connection;
const sql = require('../DB_Connnection').sql;
let Av_Equipment = require('../models/Av_equipment');

//show of the av_equipments
router.get('/', function (req, res, next) {
    db_connection.then(pool => {
        console.log("conecto");
        return pool.request().execute('showAV_Equipments');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar equipo' + err);
    });
});

//show de los brands , categorys y models que se encuentran en la bd
router.get('/brands', function (req, res, next) {
    db_connection.then(pool => {
        return pool.request().execute('showAV_Brands');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar equipo' + err);
    });
});

router.get('/models', function (req, res, next) {
    db_connection.then(pool => {
        return pool.request().execute('showAV_Models');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar equipo' + err);
    });
});

router.get('/categories', function (req, res, next) {
    db_connection.then(pool => {
        
        return pool.request().execute('showAV_Categories');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar equipo' + err);
    });
});

router.get('/states', function (req, res, next) {
    db_connection.then(pool => {
        
        return pool.request().execute('showAV_State');
    }).then(result => {
        res.send(result.recordsets[0]);
    }).catch(err => {
        res.send('fallo al mostrar equipo' + err);
    });
});

// insert a new category 
router.post('/category',function (req, res, next){
let category = req.body.category;
    db_connection.then(pool =>{
return pool.request().
input('category',sql.NVarChar(50), category).
execute('createAV_Category');
}).then(result =>{
    res.send('category created ' + result.output);
}).catch(err => {
    res.send('fallo al ejecutar el procedimiento ' + err)
});
});

// insert a new brand 
router.post('/brand',function (req, res, next){
    let brand = req.body.brand;
        db_connection.then(pool =>{
    return pool.request().
    input('brand',sql.NVarChar(50), brand).
    execute('createAV_Brand');
    }).then(result =>{
        res.send('brand created ' + result.output);
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
    });
    });

    // insert a new model 
router.post('/model',function (req, res, next){
    let model  = req.body.category;
        db_connection.then(pool =>{
    return pool.request().
    input('model',sql.NVarChar(50), model ).
    execute('createAV_Model');
    }).then(result =>{
        res.send('model created ' + result.output);
    }).catch(err => {
        res.send('fallo al ejecutar el procedimiento ' + err)
    });
    });

//populate the av_equipment
function popullateAv_equipment(pool, req) {
    let av_equipment = req.body;
    console.log("hola perro");
    //This is the applicant for the person object
    let validateEquipment = new Av_Equipment(av_equipment.model, av_equipment.brand , av_equipment.category,
        av_equipment.notes,av_equipment.barcode,av_equipment.state);
        console.log(validateEquipment.barcode);
    pool.input('barcode',sql.NVarChar(50), validateEquipment.barcode)
        .input('id_category', sql.Int,validateEquipment.category)
        .input('id_brand', sql.Int,validateEquipment.brand)
        .input('id_model', sql.Int, validateEquipment.model)
        .input('id_state', sql.Int, validateEquipment.state)
};

//insert an av_equipment
router.post('/av_equipment', function(req, res, next) { 
    //Send to database the person validating data
    db_connection.then(pool => {
       let poolRequest = pool.request();
       popullateAv_equipment(poolRequest, req);
        return poolRequest.execute('createAV_Equipments');
      }).then(result => {
          res.send("av_equipment created: " + result.output);
      }).catch(err => {
          res.send('Fallo al ejecutar procedimiento.' + err);
     });
  });

// modify an av_equipment
  router.put('/av_equipment/:id', function(req, res, next) {
    let ID = req.body.ID;
    //Send to database the person validating data
    db_connection.then(pool => {
       let poolRequest = pool.request();
       popullateAv_equipment(poolRequest, req);
        return poolRequest.input('old_barcode', sql.Int, ID)
        .execute('updateAV_Equipments');
      }).then(result => {
          res.send("av_equipment updated: " + result.output);
      }).catch(err => {
          res.send('Fallo al ejecutar procedimiento.' + err);
     });
  });
//update brand
  router.put('/av_equipment/brand/:id', function(req, res, next) {
    let ID = req.body.ID;
    //Send to database the person validating data
    db_connection.then(pool => {
       let poolRequest = pool.request();
        return poolRequest.input('brand_id', sql.Int, ID)
        .execute('updateAV_Brand');
      }).then(result => {
          res.send("av_brand updated: " + result.output);
      }).catch(err => {
          res.send('Fallo al ejecutar procedimiento.' + err);
     });
  });
//update model 
router.put('/av_equipment/model/:id', function(req, res, next) {
    let ID = req.body.ID;
    //Send to database the person validating data
    db_connection.then(pool => {
       let poolRequest = pool.request();
        return poolRequest.input('model_id', sql.Int, ID)
        .execute('updateAV_Model');
      }).then(result => {
          res.send("av_model updated: " + result.output);
      }).catch(err => {
          res.send('Fallo al ejecutar procedimiento.' + err);
     });
  });

  //update category
  router.put('/av_equipment/category/:id', function(req, res, next) {
    let ID = req.body.ID;
    //Send to database the person validating data
    db_connection.then(pool => {
       let poolRequest = pool.request();
        return poolRequest.input('category_id', sql.Int, ID)
        .execute('updateAV_Category');
      }).then(result => {
          res.send("av_category updated: " + result.output);
      }).catch(err => {
          res.send('Fallo al ejecutar procedimiento.' + err);
     });
  });

//eliminate an equipment per barcode 
  router.delete('/av_equipment/:id', function(req, res, next) {
    db_connection.then(pool => {
        console.log(req.params.id);
      return pool.request()
        .input('barcode', sql.Int, req.params.id)
        .execute('deleteAV_Equipments');
    }).then(result => {
        res.send("av_equipment deleted: " + req.params.id);
    }).catch(err => {
        res.send("av_equipment couldn't be deleted");
    });
});

module.exports = router;
