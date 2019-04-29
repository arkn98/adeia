const nodemailer = require('nodemailer');
const keys = require('../../config/keys');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.emailID,
    pass: keys.emailPassword
  }
});

const sendEmail = data => {
  return new Promise((resolve, reject) => {
    console.log('mail data', JSON.stringify(data, null, 2));
    let mailOptions = {
      from: keys.emailID,
      to: data.to,
      subject: data.subject,
      html: data.body
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      console.log(info);
      resolve();
    });
  });
};

module.exports = sendEmail;
