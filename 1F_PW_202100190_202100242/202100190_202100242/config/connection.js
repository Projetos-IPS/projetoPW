const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    database: 'proj_pw_202100190_202100242',
    user : 'root',
    password : '12345678'
});

connection.connect(function(error){

    if(error)
    {
            throw error;
    }
    else
    {
        console.log('Database connected, server running on port 8080.');
    }

});

module.exports = connection;