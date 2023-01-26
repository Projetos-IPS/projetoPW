const { response } = require('express');
var express = require('express');
var router = express.Router();


var database = require('../config/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
  res.end();
});


router.post('/registoP', function(request, response, next){

   var nome = request.body.nomeP;
   var email = request.body.emailP;
   var pass = request.body.passP;
   var birthday = request.body.birthdayP;
   var gender = request.body.genderP;
   var query = `INSERT INTO profissional (email,nome, data_nascimento, genero)
   values ("${email}", "${nome}", "${birthday}", "${gender}")`;
   database.query(query);
   var query2 = `INSERT INTO utilizador(email, pass, tipo_utilizador) values ("${email}", "${pass}", "profissional")`;
   database.query(query2);
   response.redirect('http://localhost:8081/');
   response.end();
});


router.post('/registoE', function(request, response, next){

   var nome = request.body.nomeE;
   var email = request.body.emailE;
   var pass = request.body.passE;
   var query = `INSERT INTO empresa (email, nome)
   values ("${email}", "${nome}")`;
   database.query(query);
   var query2 = `INSERT INTO utilizador(email, pass, tipo_utilizador) values ("${email}", "${pass}", "empresa")`;
   database.query(query2);
   response.redirect('http://localhost:8081/');
   response.end();
});

router.post('/login', function(request, response, next){

  var email = request.body.emailLogin;
  var pass = request.body.passwordLogin;

  if (email && pass)
  {
    query = 
    `SELECT * FROM utilizador WHERE email = "${email}"`;

    database.query(query, function(error,data){

      if(data.length > 0)
      {
        for (var count = 0; count < data.length; count++)
        {
          if(data[count].pass == pass)
          {
            request.session.id = data[count].id;

            response.redirect("/team");
          }
          else
          {
            response.send('Incorrect password');
          }
        }
      }

      response.end();

    });

  }
  else
  {
    response.end();
  }

});


module.exports = router;
