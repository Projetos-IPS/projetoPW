const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
var connection = require('./config/connection.js');
//const requestHandlers = require("./request-handlers.js");

var jobRouter = require('./routes/joboffers.js');
var teamRouter = require('./routes/team.js');
var indexRouter = require('./routes/index.js');
var app = express();
const port = 8888;
const host = "127.0.0.1";

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'www')));

app.listen(8888, function(){
	console.log('Server running at %s:%s', host, port);
	connection.connect(function(err){
		if(err) throw err;
		console.log('Database connected!');
	})
});

app.use('/', indexRouter);
app.use('/Homepage', indexRouter);
app.use('/Job%20offers', jobRouter);
app.use('/Team', teamRouter);


module.exports = app;
