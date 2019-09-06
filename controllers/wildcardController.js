const wildcardModel = require('../api/models/wildcard')
const cloud = require('../middleware/cloudinary')

exports.createApp = (req, res) => {
  try {
    const wildcardDetails = {
      surname: req.body.surname,
      names: req.body.names,
      dob: req.body.dob,
      noc: req.body.noc,
      jobPosition: req.body.jobPosition,
      email: req.body.email,
      phone: req.body.phone,
      list: req.body.list,
      desc: req.body.desc
    }
    wildcardModel.find({
      surname: wildcardDetails.surname,
      names: wildcardDetails.names,
      dob: wildcardDetails.dob,
      noc: wildcardDetails.noc,
      jobPosition: wildcardDetails.jobPosition,
      email: wildcardDetails.email,
      phone: wildcardDetails.phone,
      list: wildcardDetails.list,
      desc: wildcardDetails.desc
    }, (err, callback) => {
      if (err) {
        console.log(err)
        res.json({
          err: err,
          message: 'there was a problem uploading image'
        })
      } else if (callback.length >= 1) {
        res.json({
          message: 'file already exist'
        })
      } else {
        var wildcardDetails = {
          surname: req.body.surname,
          names: req.body.names,
          dob: req.body.dob,
          noc: req.body.noc,
          jobPosition: req.body.jobPosition,
          email: req.body.email,
          phone: req.body.phone,
          list: req.body.list,
          desc: req.body.desc,
          cloudImage: req.files[0].path,
          cloudFile: req.files[0].path,
          personId: ''
        }
        console.log('i got here')
        console.log(wildcardDetails.cloudImage, wildcardDetails.cloudFile)
        cloud.uploads(wildcardDetails.cloudImage, wildcardDetails.cloudFile).then((result) => {
          console.log(result)
          var wildcardDetails = {
            surname: req.body.surname,
            names: req.body.names,
            dob: req.body.dob,
            noc: req.body.noc,
            jobPosition: req.body.jobPosition,
            email: req.body.email,
            phone: req.body.phone,
            list: req.body.list,
            desc: req.body.desc,
            cloudImage: result.url,
            cloudFile: result.url,
            personId: result.id
          }

          console.log('...')
          console.log(wildcardDetails.cloudImage, wildcardDetails.cloudFile)

          wildcardModel.create(wildcardDetails, (err, created) => {
            if (err) {
              res.json({
                err: err,
                message: 'could not upload image, try again'
              })
            } else {
              res.json({
                created: created,
                message: "image uploaded successfully!!"
              })
            }
          })

        })
      }
    });
  } catch (execptions) {
    console.log(execptions)
  }
}
