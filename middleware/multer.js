

let multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    filename = Date.now() + "-" + file.originalname
    cb(null, filename)
  }
})

var upload = multer({
  storage: storage
});


module.exports = upload;
