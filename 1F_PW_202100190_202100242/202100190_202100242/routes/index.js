var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index');
  
});

router.post('/registoP', function(req, res)
{
  const data = req.body;
  User.createP(data).then(function(id){
    res.json({id : id});
  });
});

router.post('/registoE', function(req, res)
{
  const data = req.body;
  User.createE(data).then(function(id){
    res.json({id : id});
  });
});

router.post('/login', function(req, res)
{
  const data = req.body;
  User.login(data).then(function(id){
    res.json({result : id});
  });

});

router.get('/out', function(req,res){
  
  User.logout().then(res.redirect('/'));
});

module.exports = router;