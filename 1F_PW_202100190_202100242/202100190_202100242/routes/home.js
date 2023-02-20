var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');

/* GET home page. */
router.get('/', renderPage);

function renderPage(req, res) {
    if(req.session.name == undefined || req.session.name == 0 || req.session.name == 2 || req.session.name == 3) {
        res.redirect('/Homepage');
    } else {
        res.render('home');
    }
}

router.get('/getloggedinUserType', function(req, res, next) {
    let email = req.session.name;
    User.getUserType(email)
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            next(err);
        });
});

router.get('/getloggedinUserInformationProfissional', function(req, res, next) {
    let email = req.session.name;
    User.getUserDataProfissional(email)
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            next(err);
        });
});

router.get('/getloggedinUserInformationEmpresa', function(req, res, next) {
    let email = req.session.name;
    User.getUserDataEmpresa(email)
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            next(err);
        });
});

router.get('/getloggedinUserID', function(req, res, next) {
    let email = req.session.name;
    User.getIdbyEmail(email)
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            next(err);
        });
});

router.get('/getUsersProfissionais', function(req, res, next) {
    User.getIdbyEmail(req.session.name)
        .then(function(result2) {
            User.getProfissionalUsersList(result2[0].id)
                .then(function(result) {
                    res.json(result);
                })
                .catch(function(err) {
                    next(err);
                });
        })
        .catch(function(err) {
            next(err);
        });
});

router.get('/getUsersProfissionaisInformation', function(req, res, next) {
    User.getProfissionalUsersInformation(req.session.name)
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            next(err);
        });
});

router.get('/getUsersProfissionaisAge', function(req, res, next) {
    User.getProfissionalUsersAge()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            next(err);
        });
});

router.post('/sendFriendRequest', function(req, res, next) {
    const dataRQ = req.body;
    User.getIdbyEmail(req.session.name)
        .then(function(result2) {
            User.sendFriendRequest(result2[0].id, dataRQ)
                .then(function(result) {
                    res.json(result);
                })
                .catch(function(err) {
                    next(err);
                });
        })
        .catch(function(err) {
            next(err);
        });
});

router.get('/getFriendRequests', function(req, res, next) {
    User.getFriendsRequests()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            next(err);
        });
});

router.get('/getUsers', function(req, res, next) {
    User.getUserIDs()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            next(err);
        });
});

router.get('/getFriends', function(req, res, next) {
    User.getFriends(req.session.name)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        next(err);
    });
});

router.post('/acceptFriend', function(req, res, next) {
    const dataAdd = req.body;

    User.acceptFriendRequest(dataAdd)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        next(err);
    });
});

router.post('/cancelFriendRequest', function(req, res, next) {
    const dataCFQ = req.body;
    User.getIdbyEmail(req.session.name)
    .then(function(result2) {
        User.DeleteSentFriendsRequests(result2[0].id, dataCFQ)
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            next(err);
        });
    })
    .catch(function(err) {
        next(err);
    });
});

router.post('/deleteFriendRequest', function(req, res, next) {
    const dataRemove = req.body;
    User.rejectFriendRequest(dataRemove)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        next(err);
    });
});

router.post('/deleteFriend', function(req, res, next) {
    const dataR = req.body;
    User.deleteFriend(req.session.name, dataR)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        next(err);
    });
});



module.exports = router;