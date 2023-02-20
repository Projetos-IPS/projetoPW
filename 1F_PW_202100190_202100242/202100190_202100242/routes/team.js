const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');

router.get('/', renderPage);

function renderPage(req, res, next) {
  try {
    if (
      req.session.name === undefined ||
      req.session.name === 0 ||
      req.session.name === 2 ||
      req.session.name === 3
    ) {
      res.redirect('/Homepage');
    }
    res.render('team');
  } catch (err) {
    next(err);
  }
}

module.exports = router;





