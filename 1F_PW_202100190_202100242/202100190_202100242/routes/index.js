var express = require('express');
var router = express.Router();


var database = require('../config/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});


router.post('/registoP', function(request, response, next){

   var action = request.body.action;

  if(action == 'AddP')
  {
    var nome = request.body.nomeP;
    var email = request.body.emailP;
    var pass = request.body.passP;
    var birthday = request.body.birthdayP;
    var gender = request.body.genderP;
    var query = `INSERT INTO profissional (email,nome, pass, data_nascimento, genero, tipo_utilizador)
    values ("${email}", "${nome}", "${pass}", "${birthday}", "${gender}", "profissional" )`;
    database.query(query, function(error, data){

			response.json({
				message : 'Data Added'
			});

		});

  }
});

router.post('/registoP', function(request, response, next){

  var action = request.body.action;

 if(action == 'AddP')
 {
   var nome = request.body.nomeP;
   var email = request.body.emailP;
   var pass = request.body.passP;
   var birthday = request.body.birthdayP;
   var gender = request.body.genderP;
   var query = `INSERT INTO profissional (email,nome, pass, data_nascimento, genero, tipo_utilizador)
   values ("${email}", "${nome}", "${pass}", "${birthday}", "${gender}", "profissional" )`;
   database.query(query, function(error, data){

     response.json({
       message : 'Data Added'
     });

   });

 }
});

router.post('/registoE', function(request, response, next){

  var action = request.body.action;

 if(action == 'AddE')
 {
   var nome = request.body.nomeE;
   var email = request.body.emailE;
   var pass = request.body.passE;
   var query = `INSERT INTO empresa (email, nome, pass, tipo_utilizador)
   values ("${email}", "${nome}", "${pass}", "empresa" )`;
   database.query(query, function(error, data){

     response.json({
       message : 'Data Added'
     });

   });
 }
});


module.exports = router;
