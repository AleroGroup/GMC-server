const companyModel = require('../api/models/company')
const cloud = require('../middleware/cloudinary')

exports.createApp = (req, res) => {
  try {
    const companyDetails = {
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
    companyModel.find({
      surname: companyDetails.surname,
      names: companyDetails.names,
      dob: companyDetails.dob,
      noc: companyDetails.noc,
      jobPosition: companyDetails.jobPosition,
      email: companyDetails.email,
      phone: companyDetails.phone,
      list: companyDetails.list,
      desc: companyDetails.desc
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
        var companyDetails = {
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
        console.log(companyDetails.cloudImage, companyDetails.cloudFile)
        cloud.uploads(companyDetails.cloudImage, companyDetails.cloudFile).then((result) => {
          console.log(result)
          var companyDetails = {
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
           // console.log(companyDetails.cloudImage, companyDetails.cloudFile)

          companyModel.create(companyDetails, (err, created) => {
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
