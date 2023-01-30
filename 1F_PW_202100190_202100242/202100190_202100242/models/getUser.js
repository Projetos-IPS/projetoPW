var db = require('../config/connection');

function getUser(req, res, next) {

    var email = req.session.name;
    if(email !== undefined)
    {
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
  }
  else
  {
    res.redirect('Homepage');
    res.end();
  }
 };

 module.exports = getUser;