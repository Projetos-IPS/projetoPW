var express = require('express');
var router = express.Router();


router.get('/', renderPage);

 function renderPage(req, res)
 {
  res.render('profile');
 }

 module.exports = router;
