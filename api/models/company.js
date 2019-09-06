const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
  surname: {
    type: String,
    required: true
  },
  names: {
    type: String,
  },
  dob: {
    type: String,
  },
  noc: {
    type: String,
  },
  jobPosition: {
    type: String,
  },
  email: {
    type: String,
  },
  cloudImage: {
    type: String
  },
  cloudFile: {
    type: String,
  },
  phone: {
    type: String,
  },
  list: {
    type: String,
  },
  desc: {
    type: String,

  },
  personId: {
    type: String
  },
  post_date: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('company', companySchema)
