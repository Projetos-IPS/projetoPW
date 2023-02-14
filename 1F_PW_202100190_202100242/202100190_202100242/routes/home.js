var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');

/* GET home page. */
router.get('/', renderPage);

function renderPage(req, res) {
    if(req.session.name == undefined || req.session.name == 0 || req.session.name == 2 || req.session.name == 3)
    {
        res.redirect('/Homepage');
    }
    else
    {
        res.render('home');
    }
}

router.get('/getloggedinUser', function(req,res)
{
   let email = req.session.name;
   User.getUserType(email).then(function(result)
   {
      if(result[0].tipo_utilizador == 'Profissional'){
         User.getUserDataProfissional(email).then(function(result2)
         {
            res.json(result2);
         })
      }
      else if(result[0].tipo_utilizador == 'Empresa')
      {
         User.getUserDataEmpresa(email).then(function(result2)
         {
            res.json(result2);
         })
      }
   })
});

router.get('/getloggedinUserID', function(req, res)
{
    let email = req.session.name;
    User.getIdbyEmail(email).then(function(result)
    {
        res.json(result);
    })
});


module.exports = router;