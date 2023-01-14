var express = require('express');
var routerJ = express.Router();
var path = require('path');

routerJ.get('/Job%20offers', function (req, res) {
	res.sendFile(path.join(__dirname, '/../views/joboffers.html'));
});



module.exports = routerJ;