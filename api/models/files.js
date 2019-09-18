const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    surname: {
        type: String,
        required: true
    },
    names: {
        type: String,
    },
    email: {
        type: String,
    },
    cloudFile: {
        type: String,
    },
    fileId: {
        type: String
    },
    post_date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('file', fileSchema)
