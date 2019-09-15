const express = require('express')
const mongoose = require('mongoose')
const companyController = require('../../controllers/companyController')
const companyModel = require('../models/company')

const upload = require('../../middleware/multer')
const router = express.Router()

router.post('/postcompany',upload.any(), companyController.createApp)


//GET the form by id
router.get('/:companyId', (req, res, next) => {
  const id = req.params.companyId;
  companyModel.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//GET all forms
router.get('/', (req, res, next) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('index', {
        files: false
      });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', {
        files: files
      });
    }
  })

  companyModel.find().exec().then(docs => {
    console.log(docs);
    res.status(200).json(docs);
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      error: err
    });
  });
});
router.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('index', {
        files: false
      });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', {
        files: files
      });
    }
  });
});


module.exports = router





/* //this is the form for the company
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Company = require('../models/company')
const upload = require('../../middleware/multer')
const companyController = require('../../controllers/companyController')


//GET the form by id
router.get('/:comapanyId', (req, res, next) => {
    const id = req.params.comapanyId;
    Company.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


//GET all forms
 router.get('/', (req, res, next) => {
     Company.find().exec().then(docs => {
         console.log(docs);
         res.status(200).json(docs);
     }).catch(error => {
         console.log(error);
         res.status(500).json({
             error: err
         });
     });
 });

//POST
router.post('/post', (req, res, next) => {
    const company = new Company({
        surname: req.body.surname ,
        names: req.body.names,
        dob: req.body.dob,
        noc:req.body.noc,
        jobPosition:req.body.jobPosition,
        email: req.body.email,
        phone: req.body.phone,
        listAc:req.body.listAc,
        desc: req.body.desc,
    })
    company
    .save()
    .then(result => {
    console.log(result);
    res.status(201).json({
 message: 'company registered successfully'
}).catch(error => {
    console.log(error)
    res.status(500).json({
      error: err
})
})
})
});

//UPDATE

module.exports = router;
 */
