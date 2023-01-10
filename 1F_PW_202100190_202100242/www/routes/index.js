var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res) {
	res.render(path.join(__dirname + "/../views/index.pug"));
});

module.exports = router;