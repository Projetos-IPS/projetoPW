var express = require('express');
var router = express.Router();


router.get('/', renderPage);

 function renderPage(req, res)
 {
  console.log(req.session.name);
  if(req.session.name == undefined || req.session.name == 0 || req.session.name == 2 || req.session.name == 3)
   {
      res.redirect('/Homepage');
    
   }
   else
   {
      res.render('profile');
   }

 
 }

 module.exports = router;
