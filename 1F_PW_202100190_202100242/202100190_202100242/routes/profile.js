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
   
router.get('/getUserDataP', function(req, res)
{

   User.getUserType(req.session.name).then(function(type){
      if(type == 'P')
      {
         console.log(type);
         User.getUserDataP(req.session.name).then(function(data)
         {
            res.json(data);
         })
      }

 });

});
    
  
 module.exports = router;
