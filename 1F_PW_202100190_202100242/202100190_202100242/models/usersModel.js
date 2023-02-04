const mysql = require("mysql");
const options = require('../config/options.json');
const { query } = require("express");
var session = require('express-session');
const { Session } = require("express-session");
//var sessionId;

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
              if(result.length > 0)
              {
                for(var i = 0; i < result.length; i++)
                {
                  if (result[i].pass === passL)
                  {
                    if (result[i].approved == 0)
                    {
                      if(error) return reject(error);
                      resolve(0);
                      connection.end();
                    }
                    else if(result[i].approved == 1)
                    {
                      if(error) return reject(error);
                      resolve(result[i].email);//login feito com sucesso
                      connection.end();
                    }
                  }
                  else
                  {
                    if(error) return reject(error);
                    resolve(2);
                    connection.end();
                  }
                  
                }
              }
              else
              {
                if(error) return reject(error);
                resolve(3);
                connection.end();
              }
            });
  })
}

 /*   logout: function()
    {
        return new Promise(function(resolve, reject)
        {
            var query = `SELECT * FROM sessions`;
            var queryDelete = `delete from sessions WHERE id = ?`;
            var connection = mysql.createConnection(options.mysql);
            connection.query(query, function(error, result)
            {
                if(result.length > 0)
                {
                    connection.query(queryDelete, sessionId);
                    if(error) return reject(error);
                    resolve(1);
                    connection.end();
                }
                else
                {
                    if(error) return reject(error);
                    resolve(0);
                    connection.end();
                }
            });
           
        });
    }*/
}

module.exports = User;