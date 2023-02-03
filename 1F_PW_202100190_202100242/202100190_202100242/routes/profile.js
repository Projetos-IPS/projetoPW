var express = require('express');
var router = express.Router();


router.get('/', renderPage);

 function renderPage(req, res)
 {
    if(req.session.name !== undefined)
    {
    res.render('profile');
    }
    else
    {
    res.redirect('Homepage');
    }
 }

 module.exports = router;
