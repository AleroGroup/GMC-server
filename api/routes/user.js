const express = require('express');
const userModel = require('../models/user')
const router = express.Router()

router.post('/register', async (req, res, next) => {
    const userDetails = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    }
    //use schema.create to insert data into the db
    user.create(userDetails, function (err, user) {
        if (err) {
            return next(err)
        } else {
            console.log('registered')
        }
    })
});


module.exports = router