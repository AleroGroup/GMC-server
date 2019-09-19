const express = require('express')
const app = express()

// IMOPRTING ESSENTIAL LIBRARIES
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
const multipart = require('connect-multiparty')


// import database configuration
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const mongoURI = 'mongodb://alero:22oplog-reader@ds217148-a0.mlab.com:17148,ds217148-a1.mlab.com:17148/heroku_vk8w1qws?replicaSet=rs-ds217148'
mongoose.connect(mongoURI, {
    useNewUrlParser: true
}, )
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
    console.log('connected to a database')
});
// let mongo = process.env.MONGODB_PASS
const methodOverride = require('method-override')




//IMPORTING ROUTES
const companyRouter = require('./api/routes/company')
const wildcardRouter = require('./api/routes/wildcard')

/************************************************/

// SENDING EMAIL OF A USER THAT IS REGISTERED
// Multiparty Middleware
const multipartMiddleware = multipart()

// Creating the nodemailer
const transporter = nodemailer.createTransport({
    //service: 'SendGrid',
    host: "smtp.mailtrap.io",
    port: 2525,
    // host: "smtp.sendgrid.net",
    // port: 587,
    auth: {
        user: "f731df9789ba39",
        pass: "e770d763bf4ad5"
        /*user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD */
    }
});
app.post("/sendmail", multipartMiddleware, function (req, res) {
    let mailOptions = {
        to: email,
        from: 'Great Minds Challenge <info@greatmindschallenge.co.ke>',
        subject: 'Company Participant ' + name,
        html: `<div>
       <div style="display: flex;
       position: relative;
       flex-direction: column;
       width: 580px;
       height: 600px;
       margin-top:10px;
       padding:30px;
       top:10px;
       left:15%;
       max-width:600px;
       background-color: #fff">
       <div style="width: 540px;">
           <p >
           <strong style="margin:0;color:#3c4043;font-family:Google Sans,Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;line-height:30px!important;margin-bottom:24px;margin-top:24px;padding:0;word-wrap:normal">Dear Great Mind,</strong>
            <br/>  <br/>

           The Great Minds Challenge team is highly honoured by your decision to join the 2019 Challenge under the theme, “Champion by Design.”

           <strong>Congratulations</strong> on starting what will be a lifetime experience. We will tap into your passion for innovation and creativity as we align your purpose for you to be able to achieve your personal goals and your company’s vision and mission in a strategic unique GMC model.

           This world class platform will inspire and challenge you to great lengths. We will network you with some of the best experts to give you a new perception about everything you need to unlearn to develop a new mind set.

           We look forward to working closely with you and growing you to join our league of champion. Feel free to contact us any time in case of any questions.

           Please, read the following action steps in the document in the link below very carefully as this will inform you sufficiently of the next steps to take.

           We can’t wait to  meet you soon. </h4>

           <h1 style="margin:0;color:#3c4043;font-family:Google Sans,Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;line-height:30px!important;margin-bottom:24px;margin-top:24px;padding:0;word-wrap:normal">What Next?</h1>

           <h3 style="margin:0;margin-bottom:16px;color:#3c4043;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:24px;padding:0">Action step 1</h3>

           <p style="margin:0;margin-bottom:16px;color:#3c4043;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:24px;padding:0">A Clarity4D link will be sent in your email for you to take an online growth and dev. personality test.</p>

           <h3 style="margin:0;margin-bottom:10px;color:#3c4043;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:24px;padding:0"> Action step 2 </h3>
           <p style="margin:0;margin-bottom:10px;color:#3c4043;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:24px;padding:0">We will send you the APPI CREPESTM Analysis brief that will facilitate you to identify and prioritize on which challenge you will work on and BMC (Business Model Canvas) brief that will guide you to come up with execution strategy for your impact plan.<p>

           ...read more <a  style="text-decoration:none;"href="https://assets.ctfassets.net/pinw8ucllktt/2fb8LVrohmdNH5oBmxeXGs/393fb75b1e14d83b472f40f354b5d45f/Action_Steps_GMC_2019_2nd_Edition_.pdf">here </a>
        </div>
      </div>
    </div> `
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.json({
                status: 500,
                message: `Error sending mail`
            });
        } else {
            return res.json({
                status: 200,
                message: `Email sent`
            })
        }
    })
})
