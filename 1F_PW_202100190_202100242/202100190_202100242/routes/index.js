var express = require('express');
const { getUser } = require('../models/usersModel');
var router = express.Router();
var User = require('../models/usersModel');

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.name !== undefined && req.session.name !== 0 && req.session.name !== 2 && req.session.name !== 3)
  {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.render('index');
      }
    })
  }
  else
  {
    res.render('index');
  }
  
});

router.get('/getUsers', function(req, res){
  User.getUsers().then(function(result){
    res.status(200).json(result);
  }).catch(function(error){
    console.log(error);
    res.status(500).json({ error: err.message });
  })
})

router.post('/registoP', function(req, res)
{
  const data = req.body;
  User.createP(data).then(function(id){
    res.status(201).json({id : id});
  }).catch(function(error){
    console.log(error);
    res.status(500).json({ error: err.message });
  });
});

router.post('/registoE', function(req, res)
{
  const data = req.body;
  User.createE(data).then(function(id){
    res.status(201).json({id : id});
  }).catch(function(error){
    console.log(error);
    res.status(500).json({ error: err.message });
  });
});

router.post('/login', function(req, res)
{
  const data = req.body;
  User.login(data).then(function(id){
    req.session.name = id;
    res.json({result : id});  
  }).catch(function(error){
    console.log(error);
    res.status(500).json({ error: err.message });
  });
});

router.get('/out', function(req,res){
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect('/'); 
      res.end();
    }
  })
});

module.exports = router;