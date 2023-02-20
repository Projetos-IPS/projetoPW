const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');

router.get('/', (req, res, next) => {
  res.redirect('/Homepage');
});

router.get('/:userid/', (req, res, next) => {
  let id = req.params.userid;
  if (req.session.name == undefined || [0, 2, 3].includes(req.session.name)) {
    res.redirect('/Homepage');
    return;
  }

  User.getUserIDs()
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].id == id) {
          User.getEmailById(id)
            .then((email) => {
              res.render('Profile');
            })
            .catch((err) => next(err));
          return;
        }
      }
      const err = new Error('User not found');
      err.status = 404;
      next(err);
    })
    .catch((err) => next(err));
});

router.get('/getProfileType/:userid/', (req, res, next) => {
  let id = req.params.userid;
  User.getEmailById(id)
    .then((result) => {
      User.getUserType(result[0].email)
        .then((result2) => {
          res.json(result2);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.get('/getProfileInformationProfissional/:userid/', (req, res, next) => {
  let id = req.params.userid;
  User.getEmailById(id)
    .then((result) => {
      User.getUserDataProfissional(result[0].email)
        .then((result2) => {
          res.json(result2);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.get('/getProfileInformationEmpresa/:userid/', (req, res, next) => {
  let id = req.params.userid;
  User.getEmailById(id)
    .then((result) => {
      User.getUserDataEmpresa(result[0].email)
        .then((result2) => {
          res.json(result2);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.get('/getProfileBirthdate/:userid/', (req, res, next) => {
  let id = req.params.userid;
  User.getEmailById(id)
    .then((result) => {
      User.getuserBirthDate(result[0].email)
        .then((result2) => {
          res.json(result2);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.get('/getProfileExperiences/:userid/', (req, res, next) => {
  let id = req.params.userid;
  User.getEmailById(id)
    .then((result) => {
      User.getExperiences(result[0].email)
        .then((result2) => {
          res.json(result2);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.get('/getExperienceDates/:userid/', async function(req, res) {
   try {
   const id = req.params.userid;
   const result = await User.getEmailById(id);
   const result2 = await User.getExperiencesDate(result[0].email);
   res.json(result2);
   } catch (err) {
   res.status(500).json({ error: err.message });
   }
   });
   
router.get('/getProfileEducations/:userid/', async function(req, res) {
   try {
   const id = req.params.userid;
   const result = await User.getEmailById(id);
   const result2 = await User.getEducations(result[0].email);
   res.json(result2);
   } catch (err) {
   res.status(500).json({ error: err.message });
   }
   });
   
router.get('/getEducationDates/:userid/', async function(req, res) {
   try {
   const id = req.params.userid;
   const result = await User.getEmailById(id);
   const result2 = await User.geteducationDates(result[0].email);
   res.json(result2);
   } catch (err) {
   res.status(500).json({ error: err.message });
   }
   });
   
router.post('/deleteExperience/:userid/', async function(req, res) {
   try {
   const id = req.params.userid;
   const data = req.body;
   const result = await User.getEmailById(id);
   const result2 = await User.deleteExperience(data, result[0].email);
   res.json(result2);
   } catch (err) {
   res.status(500).json({ error: err.message });
   }
   });
   
router.post('/deleteEducation/:userid/', async function(req, res) {
   try {
   const id = req.params.userid;
   const data = req.body;
   const result = await User.getEmailById(id);
   const result2 = await User.deleteEducation(data, result[0].email);
   res.json(result2);
   } catch (err) {
   res.status(500).json({ error: err.message });
   }
   });
   
router.post('/editIntro/:userid/', async function(req, res) {
   try {
   const id = req.params.userid;
   const data = req.body;
   const result = await User.getEmailById(id);
   const result2 = await User.editintro(data, result[0].email);
   res.json(result2);
   } catch (err) {
   res.status(500).json({ error: err.message });
   }
   });
   
router.post('/editIntroEmpresa/:userid/', async function(req, res) {
   try {
   const id = req.params.userid;
   const data5 = req.body;
   const result = await User.getEmailById(id);
   const result2 = await User.editintroEmpresa(data5, result[0].email);
   res.json(result2);
   } catch (err) {
   res.status(500).json({ error: err.message });
   }
   });
   
router.post('/editDescription/:userid/', async function(req, res) {
   try {
   const id = req.params.userid;
   const data1 = req.body;
   const result = await User.getEmailById(id);
   const result2 = await User.editdescription(data1, result[0].email);
   res.json(result2);
   } catch (err) {
   res.status(500).json({ error: err.message });
   }
   });

router.post('/editDescriptionEmpresa/:userid/', async function(req, res) {
      try {
        const id = req.params.userid;
        const data6 = req.body;
        const result = await User.getEmailById(id);
        const result2 = await User.editDescriptionEmpresa(data6, result[0].email);
        res.status(200).json(result2);
      } catch (err) {
        res.status(500).send('Internal Server Error');
      }
    });
    
router.post('/addExperience/:userid/', async function(req, res) {
      try {
        const id = req.params.userid;
        const data2 = req.body;
        const result = await User.getEmailById(id);
        const result2 = await User.addExperience(data2, result[0].email);
        res.status(201).json(result2);
      } catch (err) {
        res.status(500).send('Internal Server Error');
      }
    });
    
router.post('/addEducation/:userid/', async function(req, res) {
      try {
        const id = req.params.userid;
        const data3 = req.body;
        const result = await User.getEmailById(id);
        const result2 = await User.addEducation(data3, result[0].email);
        res.status(201).json(result2);
      } catch (err) {
        res.status(500).send('Internal Server Error');
      }
    });



  
 module.exports = router;
