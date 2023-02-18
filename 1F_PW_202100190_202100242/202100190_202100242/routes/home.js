var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');

/* GET home page. */
router.get('/', renderPage);

function renderPage(req, res) {
    if(req.session.name == undefined || req.session.name == 0 || req.session.name == 2 || req.session.name == 3)
    {
        res.redirect('/Homepage');
    }
    else
    {
        res.render('home');
    }
}

router.get('/getloggedinUserType', function(req, res)
{
   let email = req.session.name;
   User.getUserType(email).then(function(result){
      res.json(result);
   })
});

router.get('/getloggedinUserInformationProfissional', function(req,res)
{
   let email = req.session.name;
  
         User.getUserDataProfissional(email).then(function(result2){
            res.json(result2);
         })
     
});

router.get('/getloggedinUserInformationEmpresa', function(req,res)
{
   let email = req.session.name;
  
         User.getUserDataEmpresa(email).then(function(result2){
            res.json(result2);
         })
     
});

router.get('/getloggedinUserID', function(req, res)
{
    let email = req.session.name;
    User.getIdbyEmail(email).then(function(result){
        res.json(result);
    })
});


router.get('/getUsersProfissionais', function(req,res)
{
    User.getIdbyEmail(req.session.name).then(function(result2)
    {
        User.getProfissionalUsersList(result2[0].id).then(function(result)
        {
            res.json(result);
        });
    });
   
})

router.get('/getUsersProfissionaisInformation', function(req, res)
{
    User.getProfissionalUsersInformation(req.session.name).then(function(result)
    {
        res.json(result);
    })
})

router.post('/sendFriendRequest', function(req, res)
{
    const dataRQ = req.body;

    User.getIdbyEmail(req.session.name).then(function(result2)
    {
        User.sendFriendRequest(result2[0].id, dataRQ).then(function(result)
        {
            res.json(result);
        });
    });

});

router.get('/getFriendRequests', function(req, res)
{
       User.getFriendsRequests().then(function(result)
        {
            res.json(result);
        })
   
    
});

router.get('/getUsers', function(req, res)
{
       User.getUserIDs().then(function(result)
        {
            res.json(result);
        })
   
    
});

router.get('/getFriends', function(req, res)
{
    User.getFriends(req.session.name).then(function(result)
    {
        res.json(result);
    })

});

router.post('/acceptFriend', function(req, res)
{
    const dataAdd = req.body;

    User.acceptFriendRequest(dataAdd).then(function(result) {
        res.json(result);
    })
});

router.post('/cancelFriendRequest', function(req, res)
{
    const dataCFQ = req.body;
    User.getIdbyEmail(req.session.name).then(function(result2){
        User.DeleteSentFriendsRequests(result2[0].id, dataCFQ).then(function(result)
        {
            res.json(result);
        })
    })
    
});

router.post('/deleteFriendRequest', function(req, res)
{
    const dataRemove = req.body;
    User.rejectFriendRequest(dataRemove).then(function(result)
    {
        res.json(result);
    })
    
});

router.post('/deleteFriend', function(req, res)
{
    const dataR = req.body;
    User.deleteFriend(req.session.name, dataR).then(function(result)
    {
        res.json(result);
    })
    
});




module.exports = router;