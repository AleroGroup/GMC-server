

/* var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/files');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

var upload = multer({
  storage: storage
});

 */

//module.exports = upload;

// import database configuration
const mongoose = require('mongoose')

mongoose.Promise = require('bluebird')

// let mongo = process.env.MONGODB_PASS
let multer = require('multer')
let GridFsStorage = require('multer-gridfs-storage')
let Grid = require('gridfs-stream')
const mongoURI = "mongodb://alero:22oplog-reader@ds217148-a0.mlab.com:17148,ds217148-a1.mlab.com:17148/heroku_vk8w1qws?replicaSet=rs-ds217148"

mongoose.connect(mongoURI, {
  useNewUrlParser: true
}, )
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', () => {
  console.log('connected to a database')
});

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads'
      };
      resolve(fileInfo);
    });
  }
});
const upload = multer({
  storage
})
module.exports = upload
