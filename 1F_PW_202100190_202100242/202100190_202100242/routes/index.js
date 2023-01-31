var express = require('express');
var router = express.Router();


var database = require('../config/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.name !== undefined)
  {
    req.session.destroy();
    req.session = null;
  }
  res.render('index');
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
   var query2 = `INSERT INTO utilizador(email, pass, tipo_utilizador, approved) values ("${email}", "${pass}", "profissional", 1)`;
   database.query(query2);
   response.redirect('Homepage');
   response.end();
});

router.post('/registoE', function(request, response, next){

   var nome = request.body.nomeE;
   var email = request.body.emailE;
   var pass = request.body.passE;
   var query = `INSERT INTO empresa (email, nome)
   values ("${email}", "${nome}")`;
   database.query(query);
   var query2 = `INSERT INTO utilizador(email, pass, tipo_utilizador, approved) values ("${email}", "${pass}", "empresa", 0)`;
   database.query(query2);
   response.redirect('Homepage');
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
          if(data[count].pass === pass)
          {
            if(data[count].approved == 0)
            {
              response.send('Your account needs to be approved before accessing. Contact an administrator.');
            }
            else
            {
            request.session.loggedin = true;
            request.session.name = email;
            response.redirect("/Job%20offers");
            }
          }
          else
          {
            response.send('Incorrect password');
          }       
         }
      }
      else
      {
        response.send('Email or password dont exist');
      }

      response.end();

    });

  }
  else
  {
    response.end();
  }

});

router.get('/out', function(req,res){
  req.session.destroy((err) => {
    req.session = null;
    res.redirect('/'); 
    res.end();
  })
});

module.exports = router;
