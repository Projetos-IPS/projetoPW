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
      else
      {
        res.json('Not_found');
      }
   }
   })
});

router.get('/getloggedinUser', function(req,res)
{
   
   let email = req.session.name;
   User.getloggedInUserData(email).then(function(result)
   {
      res.json(result);
   })
});

 
   


    
  
 module.exports = router;
