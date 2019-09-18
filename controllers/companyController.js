const companyModel = require('../api/models/company')
const fileModel = require('../api/models/files')
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
        return res.json({
          err: err,
          message: 'there was a problem uploading image'
        })
      } else if (callback.length >= 1) {
        return res.json({
          message: 'file already exist'
        })
      } 
      else {
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
          personId: ''
        }
        console.log('i got here')
        console.log(companyDetails.cloudImage)
      
       cloud.uploads(companyDetails.cloudImage).then((result) => {
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
            personId: result.id
          }
           console.log('...')
           console.log(companyDetails.cloudImage)

          companyModel.create(companyDetails, (err, created) => {
            if (err) {
              return res.json({
                err: err,
                message: 'could not upload image, try again'
              })
            } else {
              return res.json({
                created: created,
                message: "image uploaded successfully!!"
              })
            }
          })

        })
      }
    })
 

  const fileDetails = {
    surname: req.body.surname,
    names: req.body.names,
    email: req.body.email,
  }
 fileModel.find({
   surname: fileDetails.surname,
   names: fileDetails.names,
   email: fileDetails.email,

 }, 
 (err, callback) => {
   if (err) {
     console.log(err)
     return res.json({
       err: err,
       message: 'there was a problem uploading file'
     })
   } else if (callback.length >= 1) {
     return res.json({
       message: 'file already exist'
     })
   } else {
     var fileDetails = {
       surname: req.body.surname,
       names: req.body.names,
       email: req.body.email,
       cloudFile: req.files[1].path,
       fileId: ''
     }
     console.log('i got here')
     console.log(fileDetails.cloudFile)

     cloud.uploads(fileDetails.cloudFile).then((result) => {
      console.log(result)
       var fileDetails = {
         surname: req.body.surname,
         names: req.body.names,
         email: req.body.email,
         cloudFile: result.url,
         fileId: result.id
       }
       console.log('...')
       console.log(fileDetails.cloudFile)
       fileModel.create(fileDetails, (err, created) => {
         if (err) {
            return res.json({
             err: err,
             message: 'could not upload file, try again'
           })
         } else {
           return res.json({
             created: created,
             message: "file uploaded successfully!!"
           })
         }
       })

     })
   }
 })
  } catch (execptions) {
    console.log(execptions)
  }
}
