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
 //GET all forms
 router.get('/', (req, res, next) => {
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

 // @route GET /files/:filename
 // @desc  Display single file object
 app.get('/files/:filename', (req, res) => {
   gfs.files.findOne({
     filename: req.params.filename
   }, (err, file) => {
     // Check if file
     if (!file || file.length === 0) {
       return res.status(404).json({
         err: 'No file exists'
       });
     }
     // File exists
     return res.json(file);
   });
 });

 // @route GET /image/:filename
 // @desc Display Image
 app.get('/image/:filename', (req, res) => {
   gfs.files.findOne({
     filename: req.params.filename
   }, (err, file) => {
     // Check if file
     if (!file || file.length === 0) {
       return res.status(404).json({
         err: 'No file exists'
       });
     }

     // Check if image
     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
       // Read output to browser
       const readstream = gfs.createReadStream(file.filename);
       readstream.pipe(res);
     } else {
       res.status(404).json({
         err: 'Not an image'
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
