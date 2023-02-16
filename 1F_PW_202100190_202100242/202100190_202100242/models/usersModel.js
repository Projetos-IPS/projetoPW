const mysql = require("mysql");
const options = require('../config/options.json');
const { query } = require("express");
var session = require('express-session');
const { Session } = require("express-session");

var User = {

  //Registo e login---------------
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
                    }
                    else if(result[i].approved == 1)
                    {
                      resolve(result[i].email);//login feito com sucesso
                    }
                  }
                  else
                  {
                    resolve(2);
                  }
                  
                }
              }
              else
              {
                resolve(3);
              }
            }
            connection.end();  
            });
            
  })
    },
 //------------------------------- 
 //Aprovar empresas---------------
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
         connection.end();
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
        }
        connection.end();
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
//--------------------------------
//userdata - perfil e sessão logada
    getUserIDs: function()
  {
    return new Promise(function(resolve, reject)
    {
      let query = `SELECT * from utilizador WHERE approved = 1 AND tipo_utilizador != 'Admin'`;
      let connection = mysql.createConnection(options.mysql);
      connection.query(query, function(error, result)
      {
        if(error) {reject(error);}
        else
        {
          resolve(result);
        }
        connection.end();
      })
      
    })
  
    },

    getProfissionalUsersList: function(id)
    {
      return new Promise(function(resolve, reject)
      {
        let query = `SELECT * from utilizador WHERE approved = 1 AND tipo_utilizador != 'Admin' AND  tipo_utilizador != 'Empresa' AND id != ? ORDER BY email ASC`;
        let connection = mysql.createConnection(options.mysql);
        connection.query(query, id, function(error, result)
        {
          if(error) {reject(error);}
          else
          {
            resolve(result);
          }
          connection.end();
        })
        
      })
    
      },
    getProfissionalUsersInformation: function(email)
    {
      return new Promise(function(resolve, reject)
      {
        let query = `SELECT * from profissional WHERE email != ? ORDER BY email ASC;`;
        let connection = mysql.createConnection(options.mysql);
        connection.query(query, email, function(error, result)
        {
          if(error) {reject(error);}
          else
          {
            resolve(result);
          }
          connection.end();
        })
        
      })
    
      },

    getEmailById: function(id)
    {
      return new Promise(function(resolve, reject)
      {
        let query = `SELECT email FROM utilizador WHERE id = ?`;
        let connection = mysql.createConnection(options.mysql);
        connection.query(query, id, function(error, result)
        {
          if(error) {reject(error);}
          else
          {
            resolve(result);
            
          }
          connection.end();
        })
        
      })
   
    },

    getIdbyEmail: function(email)
    {
      return new Promise(function(resolve, reject)
      {
        let query = `SELECT id FROM utilizador WHERE email = ?`;
        let connection = mysql.createConnection(options.mysql);
        connection.query(query, email, function(error, result)
        {
          if(error) {reject(error);}
          else
          {
            resolve(result);
          }
          connection.end();
        })
       
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
          if(error) {reject(error);}
          else
          {
            resolve(result);
          }
          connection.end();
        })
       
      })
   
    },

    getUserDataProfissional: function(email)
    {
      return new Promise(function(resolve, reject)
      {
        let query = `SELECT * FROM profissional WHERE email = ?`;
        let connection = mysql.createConnection(options.mysql);
        connection.query(query, email, function(error, result)
        {
          if(error) {reject(error);}
          else
          {
            resolve(result);
          }
        connection.end();
        })
        
      })
    },

    getUserDataEmpresa: function(email)
    {
      return new Promise(function(resolve, reject)
      {
        let query = `SELECT * FROM empresa WHERE email = ?`;
        let connection = mysql.createConnection(options.mysql);
        connection.query(query, email, function(error, result)
        {
          if(error) {reject(error);}
          else
          {
            resolve(result);
          }
          connection.end();
        })
        
      })
    },

    getuserBirthDate: function(email)
    {
      return new Promise(function(resolve, reject)
      {
        let query = `SELECT date_format(data_nascimento, '%Y-%m-%d') AS data from profissional WHERE email = ?`;
    
        let connection = mysql.createConnection(options.mysql);
        connection.query(query, email, function(error, result)
        {
          if(error) {reject(error);}
          else
          {
            resolve(result);
          }
          connection.end();
        })
        
      })
    
      },

    editintro: function(data, email)
      {
        return new Promise(function(resolve, reject)
        {
          let query = `UPDATE profissional SET nome = ?, data_nascimento = ?, genero = ?, headline = ?, localidade = ? WHERE email = ?`;
          let connection = mysql.createConnection(options.mysql);
          let values = [data.nome, data.birth, data.genero, data.headline, data.localidade, email];
          connection.query(query, values, function(error, result)
          {
            if(error) {reject(error);}
            else
            {
              resolve(result.insertId);
            }
          connection.end();
          });
        
        });
      
        },

    editdescription: function(data1, email)
        {
          return new Promise(function(resolve, reject)
          {
            let query = `UPDATE profissional SET descricao = ? WHERE email = ?`;
            let connection = mysql.createConnection(options.mysql);
            let values = [data1.description, email];
            connection.query(query, values, function(error, result)
            {
              if(error) {reject(error);}
              else
              {
                resolve(result.insertId);
              }
            connection.end();
            });
          
          });
        
          },
//---------------------------------
//Pedidos de amizade---------------------
    sendFriendRequest: function(id_destino, data)
  {
  return new Promise(function(resolve, reject)
  {
    let query = `INSERT INTO pedido_amizade(id_origem, id_destino, aprovado) VALUES (?, ?, 0)`;
    let connection = mysql.createConnection(options.mysql);
    let values = [id_destino, data.userid];
    connection.query(query, values, function(error, result)
    {
      if(error) {reject(error);}
      else
      {
        resolve(0);
      }
    connection.end();
    });
  
  });

  },

  getSentFriendsRequests : function(id)
  {
    return new Promise(function(resolve, reject)
  {
    let query = `SELECT * FROM pedido_amizade WHERE id_origem = ?`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, id, function(error, result)
    {
      if(error) {reject(error);}
      else
      {
        resolve(result);
      }
    connection.end();
    });
  
  });
  },

  DeleteFriendsRequests : function(id_origem, data)
  {
    return new Promise(function(resolve, reject)
  {
    let query = `Delete FROM pedido_amizade WHERE id_origem = ? AND id_destino = ?`;
    let connection = mysql.createConnection(options.mysql);
    let values = [id_origem, data.userid];
    connection.query(query, values, function(error, result)
    {
      if(error) {reject(error);}
      else
      {
        resolve(0);
      }
    connection.end();
    });
  
  });
  },

  getReceivedFriendsRequests : function(id)
  {
    return new Promise(function(resolve, reject)
  {
    let query = `SELECT * FROM pedido_amizade WHERE id_destino = ?`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, id, function(error, result)
    {
      if(error) {reject(error);}
      else
      {
        resolve(result);
      }
    connection.end();
    });
  
  });
  },
 

}

//Pedidos de amizade---------------------


module.exports = User;