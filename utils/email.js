const nodemailer = require('nodemailer');
const keys = require('../config/keys');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.emailID,
    pass: keys.emailPassword
  }
});

module.exports = function sendMail(email, token) {
  let mailOptions = {
    from: keys.emailID,
    subject: 'test email',
    html:
      '<p><b>Click this link to reset your email - https://localhost:3000/reset-password/' +
      token +
      '</b></p>'
  };
  mailOptions.to = email;
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
