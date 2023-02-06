const mysql = require("mysql");
const options = require('../config/options.json');
const { query } = require("express");
var session = require('express-session');
const { Session } = require("express-session");

var User = {
    createP: function(data)
    {
        return new Promise(function(resolve, reject)
        {
            var sql = `INSERT INTO utilizador (email, pass, tipo_utilizador, approved) VALUES (?,?,'profissional',1)`;
            var sql2 = `INSERT INTO profissional (email, nome, data_nascimento, genero) VALUES (?,?,?,?)`;
            var values = [data.emailP, data.passP];
            var values2 = [data.emailP, data.nomeP, data.birthdayP, data.genderP];
            var connection = mysql.createConnection(options.mysql);
            connection.query(sql, values, function(error, result)
            {
                if(error) return reject(error);
                connection.query(sql2, values2);
                resolve(result.insertId);
                connection.end();
            })
        });
        
    },

    createE: function(data)
    {
        return new Promise(function(resolve, reject)
        {
            var sql = `INSERT INTO utilizador (email, pass, tipo_utilizador, approved) VALUES (?,?,'empresa',0)`;
            var values = [data.emailE, data.passE];
            var connection = mysql.createConnection(options.mysql);
            connection.query(sql, values, function(error, result)
            {
                if(error) return reject(error);
                resolve(result.insertId);
                connection.end();
            })
        });
    },

    login: function(data)
{
    return new Promise(function(resolve, reject)
  {
      
      var emailL = data.emailLogin;
      var passL = data.passLogin;

      var connection = mysql.createConnection(options.mysql);
      
            var sql = `SELECT * FROM utilizador WHERE email = ?`;
            connection.query(sql, emailL, function(error, result)
            {
              if(error) {return reject(error);}
              else
              {
              if(result.length > 0)
              {
                for(var i = 0; i < result.length; i++)
                {
                  if (result[i].pass === passL)
                  {
                    if (result[i].approved == 0)
                    {
                      resolve(0);
                      connection.end();
                    }
                    else if(result[i].approved == 1)
                    {
                      resolve(result[i].email);//login feito com sucesso
                      connection.end();
                    }
                  }
                  else
                  {
                    resolve(2);
                    connection.end();
                  }
                  
                }
              }
              else
              {
                resolve(3);
                connection.end();
              }
            }
            });
            
  })
    },

    getUserType: function(email)
    {
      return new Promise(function(resolve, reject)
      {
        var query = `SELECT * FROM utilizador WHERE email = ?`;
        var connection = mysql.createConnection(options.mysql);

        connection.query(query, email, function(error, result)
        {
          if(error) {return reject(error);}
          else
          {
          if(result.length > 0)
          {
            for (var i = 0; i < result.length; i++)
            {
              if(result[i].tipo_utilizador == 'profissional')
              {resolve('P'); 
              }
              else if(result[i].tipo_utilizador == 'empresa')
              {resolve('E'); 
              }
              else if(result[i].tipo_utilizador == 'admin');
              {resolve('A'); 
              }
            }
          }
        }
        });
      });
    },

    getUser: function(email)
    {
      return new Promise(function(resolve, reject)
      {
        var query = `SELECT * FROM utilizador WHERE email = ?`;
        var connection = mysql.createConnection(options.mysql);

        connection.query(query, email, function(error, result)
        {
          if(error) {return reject(error);}
          else
          {
          if(result.length > 0)
          {
            for (var i = 0; i < result.length; i++)
            {
              if(result[i].tipo_utilizador == 'profissional')
              {resolve(result); 
              }
              else if(result[i].tipo_utilizador == 'empresa')
              {resolve(result); 
              }
              else if(result[i].tipo_utilizador == 'admin');
              {resolve(result); 
              }
            }
          }
        }
        });
      });
    },

    getUserDataP: function(email)
    {
      return new Promise(function(resolve, reject)
      {
        var query = `SELECT email, nome, data_nascimento, genero, occupation, descricao, localidade, visualizacao FROM profissional WHERE email = ?`
        var connection = mysql.createConnection(options.mysql);

        connection.query(query, email, function(error,result)
        {
          if(error) { return reject(error);}
          else
          {
            resolve(result);
            connection.end();
          }
        });
      });
    },

    getUserDataE: function(email)
    {
      return new Promise(function(resolve, reject)
      {
        var query = `SELECT email, nome, descricao, site, logotipo FROM empresa WHERE email = ?`
        var connection = mysql.createConnection(options.mysql);

        connection.query(query, email, function(error,result)
        {
          if(error) { return reject(error);}
          else
          {
            resolve(result);
            connection.end();
          }
        });
      });
    },

    getUserDataA: function(email)
    {
      return new Promise(function(resolve, reject)
      {
        var query = `SELECT email, pass, tipo_utilizador, approved FROM utilizador WHERE email = ?`
        var connection = mysql.createConnection(options.mysql);

        connection.query(query, email, function(error,result)
        {
          if(error) { return reject(error);}
          else
          {
            resolve(result);
            connection.end();
          }
        });
      });
    },

}

module.exports = User;