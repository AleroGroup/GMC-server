const express = require('express');
const wildcardController = require('../../controllers/wildcardController')
const wildcardModel = require('../models/wildcard')
const upload = require('../../middleware/multer')
const router = express.Router()

router.post('/postwildcard', upload.any(), wildcardController.createApp)


//GET the form by id
router.get('/:wildcardId', (req, res, next) => {
  const id = req.params.wildcardId;
  wildcardModel.findById(id)
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
  wildcardModel.find().exec().then(docs => {
    console.log(docs);
    res.status(200).json(docs);
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      error: err
    });
  });
});
module.exports = router





/* //this is the form for the company
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer');
const Wildcard = require('../models/wildcard')

//GET the form by id
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'video/mp4' || file.mimetype === 'application/vnd.ms-powerpoint') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
const uploadDoc = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/:wildcardId', (req, res, next) => {
    const id = req.params.wildcardId;
    Wildcard.findById(id)
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
     Wildcard.find()
     .exec()
     .then(docs => {
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
    const wildcard = new Wildcard({
        _id: new mongoose.Types.ObjectId(),
        surname: req.body.surname ,
        names: req.body.names,
        dob: req.body.dob,
        noc:req.body.noc,
        jobTitle:req.body.jobTitle,
        email: req.body.email,
        phone: req.body.phone,
        listAc:req.body.listAc,
        desc: req.body.desc,
        ppic: req.file.path,
        cv: req.file.path
    })
    wildcard
      .save()
        .then(result => {
        console.log(result);
        res.status(201).json({
     message: 'wildcard registered successfully'
    }).catch(error => {
        console.log(error)
        res.status(500).json({
          error: err
    })
})
})
});

//UPDATE

router.delete('/:wildcardId', (req, res, next) => {
  const id = req.params.productId;
  Wildcard.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Wildcard form details deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/wildcard',
              body: { surname: 'String',
                names: 'String',
                dob: 'String',
                noc: 'String',
                jobTitle: 'String',
                email:  'String',
                phone: 'String',
                listAc: 'String',
                desc: 'String',
                p_pic: 'String',
                cv:'String' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
 */
