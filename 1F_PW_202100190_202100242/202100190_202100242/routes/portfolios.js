var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');

/* GET home page. */
router.get('/', renderPage);

function renderPage(req, res, next) {
    try {
        if(req.session.name == undefined || req.session.name == 0 || req.session.name == 2 || req.session.name == 3)
        {
            res.redirect('/Homepage');
        }
        else
        {
            res.render('portfolios');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = router;