var config = {
    database: { 
    host : "localhost",
    user: "root",
    password: "12345678",
    port: 3306,
    database: "proj_bd_202100190_202100242"
    },
    server: {
      host: '127.0.01',
      port: '8888'
    }
}

module.exports = config;

/*
connection.connect(function(err) {
    if (err) throw err
    console.log('Está conectado à BD ...')
  })
  //fim da conexão MySQL.*/