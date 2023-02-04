var express = require('express');
const { getUser } = require('../models/usersModel');
var router = express.Router();
var User = require('../models/usersModel');

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.name !== undefined && req.session.name !== 0 && req.session.name !== 2 && req.session.name !== 3)
  {
    req.session.destroy((err) => {
      res.render('index');
    })
  }
  else
  {
  res.render('index');
  }
  
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
    req.session.name = id;
    res.json({result : id});  
  });

 /* if(User.login(data).catch(1)){
    req.session.name = req.body.emailLogin
  };*/

  
});

router.get('/out', function(req,res){
  req.session.destroy((err) => {
    res.redirect('/'); 
    res.end();
  })
});

module.exports = router;