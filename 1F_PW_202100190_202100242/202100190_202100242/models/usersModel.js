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
          let sql = `INSERT INTO utilizador (email, nome, pass, tipo_utilizador, approved) VALUES (?,?,?,'Profissional',1)`;
          let sql2 = `INSERT INTO profissional (email, nome, data_nascimento, genero) VALUES (?,?,?,?)`;
          let values = [data.emailP, data.nomeP, data.passP];
          let values2 = [data.emailP, data.nomeP, data.birthdayP, data.genderP];
          let connection = mysql.createConnection(options.mysql);
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
          let sql = `INSERT INTO utilizador (email, nome, pass, tipo_utilizador, approved) VALUES (?,?,?,'Empresa',0)`;
          let values = [data.emailE,data.nomeE, data.passE];
          let connection = mysql.createConnection(options.mysql);
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
      
    let emailL = data.emailLogin;
    let passL = data.passLogin;

    let connection = mysql.createConnection(options.mysql);
      
    let sql = `SELECT * FROM utilizador WHERE email = ?`;
            connection.query(sql, emailL, function(error, result)
            {
              if(error) {return reject(error);}
              else
              {
              if(result.length > 0)
              {
                for(let i = 0; i < result.length; i++)
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
        let query = `SELECT * FROM utilizador WHERE email = ?`;
        let connection = mysql.createConnection(options.mysql);

        connection.query(query, email, function(error, result)
        {
          if(error) {return reject(error);}
          else
          {
          if(result.length > 0)
          {
            for (let i = 0; i < result.length; i++)
            {
              if(result[i].tipo_utilizador == 'Profissional')
              {resolve('P'); 
              }
              else if(result[i].tipo_utilizador == 'Empresa')
              {resolve('E'); 
              }
              else if(result[i].tipo_utilizador == 'Admin');
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
        let query = `SELECT * FROM utilizador WHERE email = ?`;
        let connection = mysql.createConnection(options.mysql);

        connection.query(query, email, function(error, result)
        {
          if(error) {return reject(error);}
          else
          {
          resolve(result);
         }
        });
      });
    },

    getCompanyUsers: function()
    {
      return new Promise(function(resolve, reject)
      {
        let query = `SELECT * FROM utilizador WHERE tipo_utilizador = 'Empresa'`;
        let connection = mysql.createConnection(options.mysql);

        connection.query(query, function(error, result)
        {
          if(error) {return reject(error);}
          else
          {
          resolve(result);
         }
        });
      });
    },

    getUserDataP: function(email)
    {
      return new Promise(function(resolve, reject)
      {
        let query = `SELECT email, nome, data_nascimento, genero, headline, descricao, localidade, visualizacao FROM profissional WHERE email = ?`
        let connection = mysql.createConnection(options.mysql);

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
        let query = `SELECT email, nome, descricao, site, logotipo FROM empresa WHERE email = ?`
        let connection = mysql.createConnection(options.mysql);

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
        let query = `SELECT email, pass, tipo_utilizador, approved FROM utilizador WHERE email = ?`
        let connection = mysql.createConnection(options.mysql);

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

    approveCompany: function(data)
    {
      return new Promise(function(resolve, reject)
      {
        let query = `UPDATE utilizador SET approved = 1 WHERE email = ?`;
        let queryName = `SELECT nome FROM utilizador WHERE email = ?`;
        let connection = mysql.createConnection(options.mysql);
        let email = data.userid;
      connection.query(query,email, function(error)
      {
        if(error) {reject(error)}
        else
        {
          connection.query(queryName,  email, function(error, result)
          {
            if(error) {reject(error);}
            else
            {
              let query2 = `INSERT INTO empresa(email, nome) VALUES (?, ?)`;
              let values = [email, result[0].nome];
            connection.query(query2, values);
            resolve(0);
            connection.end();
            }
          });
       }
      });
      
    });
  },

  rejectCompany: function(data)
  {
    return new Promise(function(resolve, reject){
      let query = `DELETE FROM utilizador WHERE email = ?`;
      let connection = mysql.createConnection(options.mysql);
      let email = data.userid;
      connection.query(query, email, function(error)
      {
        if(error) {reject(error);}
        else
        {
          resolve(0);
          connection.end();
        }
      });
    })
  },

  deactivateCompany: function(data)
  {
    return new Promise(function(resolve, reject){
      let query2 = `DELETE FROM empresa WHERE email = ?`;
      let query = `UPDATE utilizador SET approved = 0 WHERE email = ?`;

      let connection = mysql.createConnection(options.mysql);
      let email = data.userid;
      connection.query(query, email, function(error)
      {
        if(error) {reject(error);}
        else
        {
          connection.query(query2, email, function(error)
          {
            if(error){reject(error);}
            else
            {
              resolve(0);
              connection.end();
            }
          })
        }
      })
    })
  },
  
  editUserP: function(dataEdit, email)
  {
    return new Promise(function(resolve, reject)
    {
      if(dataEdit.portfolioApproval == '')
      {
        dataEdit.portfolioApproval = 0;
      }
      let query = `UPDATE profissional SET nome = ?, headline = ?, descricao = ?, localidade = ?, portfolio = ?, visualizacao = ? WHERE email = ?`;
      let fulldata = [dataEdit.nameUser, dataEdit.headlineUser, dataEdit.descriptionUser, dataEdit.locationUser, dataEdit.portfolioUser, dataEdit.portfolioApproval, email];

      let connection = mysql.createConnection(options.mysql);
      connection.query(query, fulldata, function(error)
      {
        if(error) {reject(error);}
        else
        {
          resolve(0);
          connection.end();
        }
      })
    })
  }

}

module.exports = User;