const nodemailer = require('nodemailer');
const keys = require('../config/keys');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.emailID,
    pass: keys.emailPassword
  }
});

const sendPasswordChangedMail = email => {
  let mailOptions = {
    from: keys.emailID,
    subject: 'Your password has changed',
    html:
      'This is to inform you that your account password has changed recently.'
  };
  mailOptions.to = email;
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

const sendPasswordResetMail = (email, token) => {
  let mailOptions = {
    from: keys.emailID,
    subject: 'test email',
    html:
      '<p><b>Click this link to reset your email - http://localhost:3000/reset-password?token=' +
      token +
      '</b></p>'
  };
  mailOptions.to = email;
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = {
  sendPasswordChangedMail,
  sendPasswordResetMail
};
