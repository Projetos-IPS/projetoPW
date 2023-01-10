const express = require("express");
const app = express();
//const bodyParser = require("body-parser");
//const requestHandlers = require("./request-handlers.js");

const port = 8081;
const host = 'localhost';

app.set('view engine', 'pug');
app.use(express.static('public'));


app.get('/', (req, res) => {
	res.render('index.pug');
});

app.get('/Job%20offers', (req, res) => {
	res.render('joboffers.pug');
});

app.get('/Homepage', (req, res) => {
	res.render('index.pug');
});

app.get('/Team', (req, res) => {
	res.render('team.pug');
});


app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`);
});


