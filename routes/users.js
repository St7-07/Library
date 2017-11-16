var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.writeHead(200,{'Content-Type':'application/json'});
  //connect to db to get users instead
  let user = {
    id:'207600853',
    name: 'Steven',
    lastname:'Quesada Arguedas',
    email:'stiv-07@hotmail.com',
    phone:'85842016',
    carnet:'B55538',
    career:'Informatica Empresarial',
    address:'Grecia',
    tipo:'1 (Estudiante)'
  };
  let users = [user, user, user];
  res.end(JSON.stringify(users));
});

router.get('/:id', function(req, res, next) {
  res.send("You are searching user: " + req.params.id);
});

router.post('/user', function(req, res, next) {
  res.send("You are creating:" + req.body.name);
  //call model and then validate and save to db
});

router.put('/:id', function(req, res, next) {
  res.send("You are updating user: " + req.params.id);
});

router.delete('/:id', function(req, res, next) {
  res.send("You are deleting user: " + req.params.id);
});

module.exports = router;
