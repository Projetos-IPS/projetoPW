const mysql = require("mysql");

const connectionOptions = {
    host : "localhost",
    user: "root",
    password: "12345678",
    database: "proj_bd_202100190_202100242"
};

connection.connect(function(err) {
    if (err) throw err
    console.log('Está conectado à BD ...')
  })
  //fim da conexão MySQL.