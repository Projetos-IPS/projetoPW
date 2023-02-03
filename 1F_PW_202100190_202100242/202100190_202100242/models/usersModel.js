const mysql = require("mysql");
const session = require("express-session");
const options = require('../config/options.json');


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
    }
}

module.exports = User;