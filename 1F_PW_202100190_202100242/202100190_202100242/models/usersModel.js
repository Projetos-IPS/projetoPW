const mysql = require("mysql");
const session = require("express-session");
const options = require('../config/options.json');
const { query } = require("express");


var User = {
    createP: function(data)
    {
        return new Promise(function(resolve, reject)
        {
            var sql = `INSERT INTO utilizador (email, pass, tipo_utilizador, approved) VALUES (?,?,'profissional',1)`;
           // var sql = `INSERT INTO utilizador (email, pass, tipo_utilizador, approved) VALUES ('${data.emailP}','${data.passP}','profissional',1)`;
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
            var sql = `SELECT * FROM utilizador WHERE email = ?`
            var emailL = data.emailLogin;
            var passL = data.passLogin;

            var connection = mysql.createConnection(options.mysql);
            connection.query(sql, emailL, function(error, result)
            {
                if(result.length>0)
                {
                    for(var i = 0; i < result.length; i++)
                    {
                        if(result[i].pass === passL)
                        {
                            if(result[i].approved === 0)
                            {
                                resolve(0); //conta não aprovada por administrador
                                connection.end();
                            }
                            else
                            {
                                resolve(result[i].email);
                                connection.end();
                            }
                        }
                        else
                        {
                            resolve(2);
                            connection.end(); //incorrect password
                        }
                    }
                }
                else
                {
                    resolve(3);
                    connection.end(); //account doesnt exist
                }
            })
        });
    }
}

module.exports = User;