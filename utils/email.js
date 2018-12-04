const nodemailer = require('nodemailer');
const keys = require('../config/keys');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.emailID,
    pass: keys.emailPassword
  }
});

let mailOptions = {
  from: 'arun19091998@gmail.com',
  subject: 'test email',
  html: '<p><b>test mail</b></p>'
};

module.exports = function sendMail(email) {
  mailOptions.to = email;
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
