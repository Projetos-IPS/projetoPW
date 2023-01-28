const { name } = require('ejs');
var express = require('express');
var router = express.Router();
var db = require('../config/connection')


/* GET home page. */
router.get('/', function(req, res, next) {

var email = req.session.name;
var query = `SELECT tipo_utilizador FROM utilizador WHERE email = "${email}"`;
db.query(query, function(error,data){

  if (data.length > 0)
  {
    for (var count = 0; count < data.length; count++)
    {
      if(data[count].tipo_utilizador === "profissional")
      {
        var query2 = `SELECT nome FROM profissional WHERE email = "${email}"`;
        db.query(query2, function(error,data)
        {
            if(data.length > 0)
            {
              for(var count = 0; count < data.length; count++)
              {
                var nameU = data[count].nome;
              }
            }
            res.render('joboffers', { title: 'Job offers', name: nameU});
        });
      }
      if(data[count].tipo_utilizador == 'empresa')
      {
        var query2 = `SELECT nome FROM empresa WHERE email = "${email}"`;
        db.query(query2, function(error,data)
        {
            if(data.length > 0)
            {
              for(var count = 0; count < data.length; count++)
              {
                var nameU = data[count].nome;
              }
            }
            res.render('joboffers', { title: 'Job offers', name: nameU});
        });
      }       
     }
  }
});

});


module.exports = router;
