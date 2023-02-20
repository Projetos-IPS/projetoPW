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

login: function(data) {
    return new Promise(function(resolve, reject) {
      let emailL = data.emailLogin;
      let passL = data.passLogin;
      let connection = mysql.createConnection(options.mysql);
      let sql = `SELECT * FROM utilizador WHERE email = ?`;
      connection.query(sql, emailL, function(error, result) {
        if (error) {
          return reject(error);
        } else {
          if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
              if (result[i].pass === passL) {
                if (result[i].approved == 0) {
                  resolve(0);
                } else if (result[i].approved == 1) {
                  resolve(result[i].email);
                }
              } else {
                resolve(2);
              }
            }
          } else {
            resolve(3);
          }
        }
        connection.end();
      });
    });
  },

  //------------------------------- 
//Aprovar empresas---------------
 getCompanyUsers: function() {
  return new Promise(function(resolve, reject) {
    let query = `SELECT * FROM utilizador WHERE tipo_utilizador = 'Empresa'`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
      connection.end();
    });
  });
},

approveCompany: function(data) {
  return new Promise(function(resolve, reject) {
    let query = `UPDATE utilizador SET approved = 1 WHERE email = ?`;
    let queryName = `SELECT nome FROM utilizador WHERE email = ?`;
    let connection = mysql.createConnection(options.mysql);
    let email = data.userid;
    connection.query(query, email, function(error) {
      if (error) {
        reject(error);
      } else {
        connection.query(queryName, email, function(error, result) {
          if (error) {
            reject(error);
          } else {
            let query2 = `INSERT INTO empresa(email, nome) VALUES (?, ?)`;
            let values = [email, result[0].nome];
            connection.query(query2, values, function(error) {
              if (error) {
                reject(error);
              } else {
                resolve(0);
              }
              connection.end();
            });
          }
        });
      }
    });
  });
},

rejectCompany: function(data) {
  return new Promise(function(resolve, reject) {
    let query = `DELETE FROM utilizador WHERE email = ?`;
    let connection = mysql.createConnection(options.mysql);
    let email = data.userid;
    connection.query(query, email, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve(0);
      }
      connection.end();
    });
  });
},

deactivateCompany: function(data) {
  return new Promise(function(resolve, reject) {
    let query2 = `DELETE FROM empresa WHERE email = ?`;
    let query = `UPDATE utilizador SET approved = 0 WHERE email = ?`;
    let connection = mysql.createConnection(options.mysql);
    let email = data.userid;
    connection.query(query, email, function(error) {
      if (error) {
        reject(error);
      } else {
        connection.query(query2, email, function(error) {
          if (error) {
            reject(error);
          } else {
            resolve(0);
          }
          connection.end();
        });
      }
    });
  });
},
//--------------------------------
//userdata - perfil e sessão logada
getUserIDs: function() {
  return new Promise(function(resolve, reject) {
    let query = `SELECT * from utilizador WHERE approved = 1 AND tipo_utilizador != 'Admin'`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, function(error, result) {
      if (error) {
        reject(error);
        connection.end();
      } else {
        resolve(result);
        connection.end();
      }
    })
  })
},

getProfissionalUsersList: function(id) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT * from utilizador WHERE approved = 1 AND tipo_utilizador != 'Admin' AND  tipo_utilizador != 'Empresa' AND id != ? ORDER BY email ASC`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, id, function(error, result) {
      if (error) {
        reject(error);
        connection.end();
      } else {
        resolve(result);
        connection.end();
      }
    })
  })
},

getProfissionalUsersInformation: function(email) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT * from profissional WHERE email != ? ORDER BY email ASC;`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, email, function(error, result) {
      if (error) {
        reject(error);
        connection.end();
      } else {
        resolve(result);
        connection.end();
      }
    })
  })
},

getProfissionalUsersAge: function(email) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT FLOOR(DATEDIFF(CURDATE(), data_nascimento) / 365.25) AS age FROM profissional ORDER BY email ASC;`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, email, function(error, result) {
      if (error) {
        reject(error);
        connection.end();
      } else {
        resolve(result);
        connection.end();
      }
    })
  })
},

getEmailById: function(id) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT email FROM utilizador WHERE id = ?`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, id, function(error, result) {
      if (error) {
        reject(error);
        connection.end();
      } else {
        resolve(result);
        connection.end();
      }
    })
  })
},

getIdbyEmail: function(email) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT id FROM utilizador WHERE email = ?`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, email, function(error, result) {
      if (error) {
        reject(error);
        connection.end();
      } else {
        resolve(result);
        connection.end();
      }
    })
  })
},

getUserType: function(email) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT * FROM utilizador WHERE email = ?`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, email, function(error, result) {
      if (error) {
        reject(error);
        connection.end();
      } else {
        resolve(result);
        connection.end();
      }
    })
  })
},

getUserDataProfissional: function(email) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT * FROM profissional WHERE email = ?`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, email, function(error, result) {
      if (error) {
        connection.end();
        reject(error);
      } else {
        connection.end();
        resolve(result);
      }
    });
  });
},

getUserDataEmpresa: function(email) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT * FROM empresa WHERE email = ?`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, email, function(error, result) {
      if (error) {
        connection.end();
        reject(error);
      } else {
        connection.end();
        resolve(result);
      }
    });
  });
},

getuserBirthDate: function(email) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT date_format(data_nascimento, '%Y-%m-%d') AS data from profissional WHERE email = ?`;

    let connection = mysql.createConnection(options.mysql);
    connection.query(query, email, function(error, result) {
      if (error) {
        connection.end();
        reject(error);
      } else {
        connection.end();
        resolve(result);
      }
    });
  });
},

editintro: function(data, email) {
  return new Promise(function(resolve, reject) {
    let query = `UPDATE profissional SET nome = ?, data_nascimento = ?, genero = ?, headline = ?, localidade = ?, visualizacao_empresas = ? WHERE email = ?`;
    let connection = mysql.createConnection(options.mysql);
    let values = [data.nome, data.birth, data.genero, data.headline, data.localidade, data.visualizacao, email];
    connection.query(query, values, function(error, result) {
      if (error) {
        connection.end();
        reject(error);
      } else {
        connection.end();
        resolve(result.insertId);
      }
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
                connection.end();
              }
            });
          });
},

addExperience: function(data, email) {
  return new Promise(function(resolve, reject) {
    if (data.data_fim == '') {
      data.data_fim = null;
    } else {
      data.data_fim += '-01';
    }

    let query = `INSERT INTO experiencia_trabalho(email_profissional, cargo, regime, nome_empresa, localizacao, tipo_localizacao, trabalho_atual, data_inicio, data_fim, descricao) values (?,?,?,?,?,?,?,?,?,?)`;
    let connection = mysql.createConnection(options.mysql);
    let values = [email, data.cargo, data.regime, data.nome_empresa, data.localizacao, data.tipo_localizacao, data.trabalho_atual, data.data_inicio, data.data_fim, data.descricao];
    connection.query(query, values, function(error, result) {
      connection.end(); // close the connection first
      
      if (error) {
        reject(error);
      } else {
        resolve(result.insertId);
      }
    });
  });
},

addEducation: function(data, email) {
  return new Promise(function(resolve, reject) {
    if (data.date_end == '') {
      data.date_end = null;
    } else {
      data.date_end += '-01';
    }

    if (data.grade == '') {
      data.grade = null;
    }

    let query = `INSERT INTO educacao(email_profissional, estabelecimento_ensino, tipo_curso, nome_curso, atual, data_inicio, data_fim, media, atividades, descricao) values (?,?,?,?,?,?,?,?,?,?)`;
    let connection = mysql.createConnection(options.mysql);
    let values = [email, data.name_school, data.name_degree, data.name_field, data.currently_studying, data.date_start, data.date_end, data.grade, data.activities, data.description];
    connection.query(query, values, function(error, result) {
      connection.end(); // close the connection first
      
      if (error) {
        reject(error);
      } else {
        resolve(result.insertId);
      }
    });
  });
},

getExperiences: function(email) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT * FROM experiencia_trabalho WHERE email_profissional = ?`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, email, function(error, result) {
      connection.end(); // close the connection first
      
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
},

getExperiencesDate: function(email) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT id, DATE_FORMAT(data_inicio, '%M %Y') AS datainicio, DATE_FORMAT(data_fim, '%M %Y') AS datafim FROM experiencia_trabalho WHERE email_profissional = ?`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, email, function(error, result) {
      connection.end(); // close the connection first
      
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
},

deleteExperience: function(data, email) {
  return new Promise(function(resolve, reject) {
    let query = `DELETE FROM experiencia_trabalho WHERE id = ? and email_profissional = ?`;
    let connection = mysql.createConnection(options.mysql);
    let values = [data.id, email];

    connection.query(query, values, function(error, result) {
      if (error) {
        connection.end();
        reject(error);
      } else {
        connection.end();
        resolve(0);
      }
    });
  });
},

getEducations: function(email) {
  return new Promise(function(resolve, reject) {
    let query = `SELECT * FROM educacao WHERE email_profissional = ?`;
    let connection = mysql.createConnection(options.mysql);

    connection.query(query, email, function(error, result) {
      if (error) {
        connection.end();
        reject(error);
      } else {
        connection.end();
        resolve(result);
      }
    });
  });
},

geteducationDates: function(email){
  return new Promise(function(resolve, reject)
      {
        let query = `SELECT id, DATE_FORMAT(data_inicio, '%M %Y') AS datainicio, DATE_FORMAT(data_fim, '%M %Y') AS datafim FROM educacao WHERE email_profissional = ?`;
        let connection = mysql.createConnection(options.mysql);
        connection.query(query, email, function(error, result)
        {
          if(error) {reject(error);}
          else
          {
            resolve(result);
            connection.end();
          }
        });
      });
},

deleteEducation: function(data, email) {
    return new Promise(function(resolve, reject) {
        let query = `DELETE FROM educacao WHERE id = ? and email_profissional = ?`;
        let connection = mysql.createConnection(options.mysql);
        let values = [data.id, email];
        connection.query(query, values, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(0);
            }
            connection.end();
        });
    });
},

editintroEmpresa: function(data, email) {
    return new Promise(function(resolve, reject) {
        let query = `UPDATE empresa SET site = ? WHERE email = ?`;
        let connection = mysql.createConnection(options.mysql);
        let values = [data.url, email];
        connection.query(query, values, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result.insertId);
            }
            connection.end();
        });
    });
},

editDescriptionEmpresa: function(data, email) {
    return new Promise(function(resolve, reject) {
        let query = `UPDATE empresa SET descricao = ? WHERE email = ?`;
        let connection = mysql.createConnection(options.mysql);
        let values = [data.description, email];
        connection.query(query, values, function(error, result) {
            if (error) {
                reject(error);
            } else {
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
        resolve(result.insertId);
        connection.end();
      }
  
    });
  
  });

  },

  getFriendsRequests : function()
  {
    return new Promise(function(resolve, reject)
  {
    let query = `SELECT * FROM pedido_amizade`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, function(error, result)
    {
      if(error) {reject(error);}
      else
      {
        resolve(result);
        connection.end();
      }
   
    });
  
  });
  },

  DeleteSentFriendsRequests : function(id_origem, data)
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
        connection.end();
      }
 
    });
  
  });
  },

  acceptFriendRequest : function(data)
  {
    return new Promise(function(resolve, reject)
  {
    let values1 = [data.origem, data.destino];
    let values2 = [data.useremail, data.destinoemail];
    let query1 = `UPDATE pedido_amizade SET aprovado = 1 WHERE id_origem = ? AND id_destino = ?`;
    let query2 = `INSERT INTO amigo(email_utilizador, email_amigo) VALUES (?, ?)`;
    let query3 = `INSERT INTO amigo(email_amigo, email_utilizador) VALUES (?, ?)`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query1, values1, function(error)
    {
      if(error) {reject(error);}
      else
      {
        connection.query(query2, values2, function(error, result)
        {
          connection.query(query3, values2, function(error, result)
          {
              resolve(0);
              connection.end();
          });
        });
      }
   
    });
  
  });
  },

  rejectFriendRequest : function(data)
  {
    return new Promise(function(resolve, reject)
  {
    let values1 = [data.origem, data.destino];

    let query1 = `DELETE from pedido_amizade WHERE id_origem = ? and id_destino = ?`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query1, values1, function(error,result)
    {
      if(error) {reject(error);}
      else
      {
        resolve(0);
        connection.end();
      }
   
    });
  
  });
  },

  getFriends : function(email)
  {
    return new Promise(function(resolve, reject)
  {
    let query = `SELECT * FROM amigo WHERE email_utilizador = ?`;
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, email, function(error, result)
    {
      if(error) {reject(error);}
      else
      {
        resolve(result);
        connection.end();
      }
   
    });
  
  });
  },

  deleteFriend : function(email, data)
  {
    return new Promise(function(resolve, reject)
  {
    let query = `DELETE FROM amigo WHERE email_utilizador = ? AND email_amigo = ?`;
    let query3 = `DELETE FROM amigo WHERE email_amigo = ? AND email_utilizador = ?`;
    let query2 = `DELETE FROM pedido_amizade WHERE id_origem = ? AND id_destino = ?`;
    let query4 = `DELETE FROM pedido_amizade WHERE id_destino = ? AND id_origem = ?`;
  
    let values = [email, data.emailUser];
    let values2 = [data.origem, data.destino]
    let connection = mysql.createConnection(options.mysql);
    connection.query(query, values, function(error, result)
    {
      if(error) {reject(error);}
      else
      {
        connection.query(query2, values2, function(error, result){
          connection.query(query3, values, function(error, result){
            connection.query(query4, values2, function(error, result){
              resolve(0);
              connection.end();
            })
          })
        })
      }
   
    });
  
  });
  },

}
//---------------------


module.exports = User;