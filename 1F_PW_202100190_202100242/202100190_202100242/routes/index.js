var express = require('express');
var router = express.Router();


var database = require('../config/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});


router.post('/registoP', function(request, response, next){

   var nome = request.body.nomeP;
   var email = request.body.emailP;
   var pass = request.body.passP;
   var birthday = request.body.birthdayP;
   var gender = request.body.genderP;
   var query = `INSERT INTO profissional (email,nome, pass, data_nascimento, genero)
   values ("${email}", "${nome}", "${pass}", "${birthday}", "${gender}")`;
   database.query(query);
   var query2 = `INSERT INTO utilizador(email, tipo_utilizador) values ("${email}", "profissional")`;
   database.query(query2);
   response.redirect('http://localhost:8081/');
});


router.post('/registoE', function(request, response, next){

   var nome = request.body.nomeE;
   var email = request.body.emailE;
   var pass = request.body.passE;
   var query = `INSERT INTO empresa (email, nome, pass)
   values ("${email}", "${nome}", "${pass}")`;
   database.query(query);
   var query2 = `INSERT INTO utilizador(email, tipo_utilizador) values ("${email}", "empresa")`;
   database.query(query2);
   response.redirect('http://localhost:8081/');
});



module.exports = router;
