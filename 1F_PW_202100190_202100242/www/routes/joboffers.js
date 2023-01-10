var express = require('express');
var routerJ = express.Router();
var path = require('path');

routerJ.get('/', function (req, res) {
	res.render(path.join(__dirname + "/../views/joboffers.pug"));
});

module.exports = routerJ;