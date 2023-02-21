const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');

router.get('/', function(req, res) {
  if (req.session.name == undefined || req.session.name == 0 || req.session.name == 2 || req.session.name == 3) {
    res.redirect('/Homepage');
  } else {
    res.render('approveUsers');
  }
});

router.get('/getUsers', async function(req, res) {
  try {
    const result = await User.getCompanyUsers();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/UpdateUser', async function(req, res) {
  try {
    const data = req.body;
    const result = await User.approveCompany(data);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/RejectUser', async function(req, res) {
  try {
    const data = req.body;
    const result = await User.rejectCompany(data);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/DeactivateUser', async function(req, res) {
  try {
    const data = req.body;
    const result = await User.deactivateCompany(data);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;