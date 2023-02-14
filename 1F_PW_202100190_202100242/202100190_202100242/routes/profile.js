var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');
var app = require('../app');

router.get('/', function(req, res, next)
{
  next();
});

router.get('/:userid/', function(req, res)
{
   let id = req.params.userid;
   if(req.session.name == undefined || req.session.name == 0 || req.session.name == 2 || req.session.name == 3)
    {
        res.redirect('/Homepage');
    }
    else
    {
   User.getUserIDs().then(function(result)
   {
      for(let i = 0; i < result.length; i++)
      {
         if(result[i].id == id)
      {
         User.getEmailById(id).then(function(email)
         {
            res.render('Profile');
         });
      }
   }
   })
   }
});

router.get('/getProfileType/:userid/', function(req, res)
{
   let id = req.params.userid;
   User.getEmailById(id).then(function(result)
   {
      User.getUserType(result[0].email).then(function(result2)
      {
         res.json(result2);
      })
   })

});

router.get('getProfileInformationProfissional/:userid/', function(req, res)
{
   let id = req.params.userid;
   User.getEmailById(id).then(function(result)
   {
      User.getUserDataProfissional(result[0].email).then(function(result2)
      {
         res.json(result2);
      })
   })
});

router.get('getProfileInformationEmpresa/:userid/', function(req, res)
{
   let id = req.params.userid;
   User.getEmailById(id).then(function(result)
   {
      User.getUserDataEmpresa(result[0].email).then(function(result2)
      {
         res.json(result2);
      })
   })
});


  
 module.exports = router;
