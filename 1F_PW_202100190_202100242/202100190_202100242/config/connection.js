var mysql = require("mysql");

var connection = mysql.createConnection ({
    host : "localhost",
    user: "root",
    password: "12345678",
    port: 3306,
    database: "proj_pw_202100190_202100242"
});

module.exports = connection;

