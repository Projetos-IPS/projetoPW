var express = require('express');
var routerI = express.Router();
var path = require('path');

routerI.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/../views/index.html'));
});



module.exports = routerI;