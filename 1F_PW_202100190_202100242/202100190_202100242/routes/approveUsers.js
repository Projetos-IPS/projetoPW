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
      res.render('approveUsers');
   }
});

router.get('/getUsers', function(req, res)
{
    User.getCompanyUsers().then(function(result)
    {
        res.json(result);
    });
})

router.post('/UpdateUser', function(req, res){
    var data = req.body;
    User.approveCompany(data).then(function(result)
    {
        res.json(result);
    });
 
});

router.post('/RejectUser', function(req, res){
    var data = req.body;
    User.rejectCompany(data).then(function(result)
    {
        res.json(result);
    });
 
});

router.post('/DeactivateUser', function(req, res){
    var data = req.body;
    User.deactivateCompany(data).then(function(result)
    {
        res.json(result);
    });
 
});
module.exports = router;
