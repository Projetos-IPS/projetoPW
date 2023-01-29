var express = require('express');
const { name } = require('ejs');
var router = express.Router();
var db = require('../config/connection');

/* GET home page. */
router.get('/', getUser, renderPage);

function getUser(req, res, next) {

    var email = req.session.name;
    query = `SELECT tipo_utilizador FROM utilizador WHERE EMAIL = "${email}"`;
    db.query(query, function(err, result)
    {
      var user = result[0].tipo_utilizador;
      if(user == 'profissional')
      {
        query2 = `SELECT nome FROM profissional where email = "${email}"`;
        db.query(query2, function(err, result)
        {
          res.locals.name = result[0].nome;
          next();
        });
      }
      else if(user == 'empresa')
      {
        query2 = `SELECT nome FROM empresa where email = "${email}"`;
        db.query(query2, function(err, result)
        {
          res.locals.name = result[0].nome;
          next();
        });
      }
    });
 };

 function renderPage(req, res)
 {
  res.render('team');
 }

module.exports = router;
