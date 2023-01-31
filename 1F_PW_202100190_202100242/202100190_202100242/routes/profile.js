var express = require('express');
var router = express.Router();
var getUser = require('../models/getUser');

router.get('/', getUser,renderPage);

 function renderPage(req, res)
 {
  res.render('profile');
 }

 module.exports = router;
