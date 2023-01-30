
var express = require('express');
var router = express.Router();

var getUser = require('../models/getUser');

/* GET home page. */
router.get('/', getUser, renderPage);

 function renderPage(req, res)
 {
  res.render('joboffers');
 }

module.exports = router;
