var express = require('express');
var routerT = express.Router();
var path = require('path');

routerT.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/../views/team.html'));
});



module.exports = routerT;