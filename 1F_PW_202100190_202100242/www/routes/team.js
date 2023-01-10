var express = require('express');
var routerT = express.Router();
var path = require('path');

routerT.get('/', function (req, res) {
	res.render(path.join(__dirname + "/../views/team.pug"));
});

module.exports = routerT;