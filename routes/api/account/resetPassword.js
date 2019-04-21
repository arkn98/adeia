const { validationResult } = require('express-validator/check');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');
const { sendEmail } = require('../../utils');

const resetPassword = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  let hash = crypto
    .createHash('sha256')
    .update(req.body.token)
    .digest('hex');
  User.findOne({
    staffId: req.body.staffId,
    resetPasswordToken: hash,
    resetPasswordExpires: { $gt: Date.now() }
  })
    .then(user => {
      if (!user) {
        errors.msg = 'Link has expired';
        return res.status(400).json(errors);
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          user.set({
            password: hash,
            resetPasswordExpires: -1,
            resetPasswordToken: '',
            pwdResetTime: Date.now()
          });
          user
            .save()
            .then(user => {
              sendEmail({
                to: user.email,
                subject: 'Your password has changed',
                body:
                  'This is to inform you that your account password has changed recently.'
              });
              return res.status(200).json('success');
            })
            .catch(err => res.status(400).json(err));
        });
      });
    })
    .catch(err => {
      errors.msg = 'Link has expired';
      return res.status(400).json(errors);
    });
};

module.exports = resetPassword;
