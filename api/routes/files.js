const express = require('express')
const fileModel = require('../models/files')
const router = express.Router()

//GET the form by id
router.get('/view/:id', (req, res, next) => {
    const id = req.params.id;
    fileModel.findById(id)
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
    fileModel.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: err
        });
    });
});

// Delete by id a form post
router.route('/delete/:id').delete(function (req, res) {
    fileModel.findByIdAndRemove({
        _id: req.params.id
    }, function (err) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = router



