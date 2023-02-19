var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');
var app = require('../app');

router.get('/', function(req, res, next)
{
       res.redirect('/Homepage');
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

router.get('/getProfileInformationProfissional/:userid/', function(req, res)
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

router.get('/getProfileInformationEmpresa/:userid/', function(req, res)
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

router.get('/getProfileBirthdate/:userid/', function(req, res)
{
   let id = req.params.userid;
   User.getEmailById(id).then(function(result)
   {
      User.getuserBirthDate(result[0].email).then(function(result2)
      {
         res.json(result2);
      })
   })
});

router.post('/editIntro/:userid/', function(req, res)
{
   let id = req.params.userid;
   const data = req.body;
   User.getEmailById(id).then(function(result)
   {
      User.editintro(data, result[0].email).then(function(result2)
      {
         res.json(result2);
      })
   })
});

router.post('/editDescription/:userid/', function(req, res)
{
   let id = req.params.userid;
   const data1 = req.body;
   User.getEmailById(id).then(function(result)
   {
      User.editdescription(data1, result[0].email).then(function(result2)
      {
         res.json(result2);
      })
   })
});

router.post('/addExperience/:userid/', function(req, res)
{
   let id = req.params.userid;
   const data2 = req.body;
   User.getEmailById(id).then(function(result)
   {
      User.addExperience(data2, result[0].email).then(function(result2)
      {
         res.json(result2);
      })
   })
});

router.post('/addEducation/:userid/', function(req, res)
{
   let id = req.params.userid;
   const data3 = req.body;
   User.getEmailById(id).then(function(result)
   {
      User.addEducation(data3, result[0].email).then(function(result2)
      {
         res.json(result2);
      })
   })
});


  
 module.exports = router;
