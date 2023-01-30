const { name } = require('ejs');
var express = require('express');
var router = express.Router();
var db = require('../config/connection')
var getUser = require('../models/getUser');

/* GET home page. */
router.get('/', getUser, renderPage);

 function renderPage(req, res)
 {
  res.render('joboffers');
 }

  



module.exports = router;
