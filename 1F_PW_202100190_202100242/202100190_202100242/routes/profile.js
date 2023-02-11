var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');

router.get('/', function(req, res)
{
   if(req.session.name == undefined || req.session.name == 0 || req.session.name == 2 || req.session.name == 3)
   {
      res.redirect('/Homepage');
    
   }
   else
   {
      res.render('Profile');
   }
});
 
router.get('/getUser', function(req, res)
{
   User.getUser(req.session.name).then(function(data){
      res.json(data);
   })
});

router.get('/getUserDataP', function(req, res)
{
   User.getUserType(req.session.name).then(function(type){
      if(type == 'P')
      {
         User.getUserDataP(req.session.name).then(function(data)
         {
            res.json(data);
         })
      }
      if(type == 'E')
      {
         User.getUserDataE(req.session.name).then(function(data)
         {
            res.json(data);
         })
      }
      if(type == 'A')
      {
         User.getUserDataA(req.session.name).then(function(data)
         {
            res.json(data);
         })
      }

 });

});

router.post('/editUser', function(req, res)
{
   const dataEdit = req.body;
   User.editUserP(dataEdit, req.session.name).then(function(result)
   {
      res.json(result);
   })
});
    
  
 module.exports = router;
