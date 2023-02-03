var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', renderPage);

 function renderPage(req, res)
 {
    if(req.session.name !== undefined)
    {
    res.render('joboffers');
    }
    else
    {
    res.redirect('Homepage');
    }
 }

module.exports = router;
