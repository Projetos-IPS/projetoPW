const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
//const requestHandlers = require("./request-handlers.js");

const port = 8080;
const host = 'localhost';

var indexRouter = require('./routes/index.js');
var jobRouter = require('./routes/joboffers.js');
var teamRouter = require('./routes/team.js');
var app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'www')));
app.use(bodyParser.urlencoded());

app.use('/', indexRouter);
app.use('/Homepage', indexRouter);
app.use('/Job%20offers', jobRouter);
app.use('/Team', teamRouter);

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`);
});
