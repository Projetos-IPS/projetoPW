var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.name !== undefined)
  {
    req.session.destroy();
    req.session = null;
  }
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
    if(id !== 0 && id !== 2 && id !== 3)
    {
      req.session.name = id;
    }
  });
});

router.get('/out', function(req,res){
  req.session.destroy((err) => {
    req.session = null;
    res.redirect('/'); 
    res.end();
  })
});

module.exports = router;
