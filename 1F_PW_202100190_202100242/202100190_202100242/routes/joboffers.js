var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', renderPage);

 function renderPage(req, res, next) {
   try {
    if(req.session.name == undefined || req.session.name == 0 || req.session.name == 2 || req.session.name == 3) {
      res.redirect('/Homepage');
    }
    else {
      res.render('joboffers');
    }
   } catch (error) {
     next(error);
   }
 }

module.exports = router;