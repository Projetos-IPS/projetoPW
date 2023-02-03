var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', renderPage);

 function renderPage(req, res)
 {

    res.render('joboffers');
   
 }

module.exports = router;
