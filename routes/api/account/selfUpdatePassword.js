const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');
const { sendEmail } = require('../../utils');

const selfUpdatePassword = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  User.findOne({ staffId: req.user.staffId }).then(user => {
    if (!user) {
      errors.msg = 'Staff Not Found';
      return res.status(400).json(errors);
    } else {
      bcrypt.compare(req.body.currentpassword, user.password).then(isMatch => {
        if (isMatch) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
              if (err) throw err;
              user.set({
                password: hash,
                resetPasswordExpires: -1,
                resetPasswordToken: '',
                pwdResetTime: Date.now()
              });
              user
                .save()
                .then(result => {
                  sendEmail({
                    to: user.email,
                    subject: 'Your password has changed',
                    body:
                      'This is to inform you that your account password has changed recently.'
                  });
                  return res.status(200).json('success');
                })
                .catch(err => console.log(err));
            });
          });
        } else {
          errors.currentpassword = 'Invalid Credentials';
          return res.status(400).json(errors);
        }
      });
    }
  });
};

module.exports = selfUpdatePassword;
