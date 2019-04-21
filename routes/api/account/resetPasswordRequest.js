const { validationResult } = require('express-validator/check');
const crypto = require('crypto');
const User = require('../../../models/User');
const { sendEmail } = require('../../utils');

const resetPasswordRequest = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  const email = req.body.email;
  User.findOne({ email })
    .then(user => {
      if (user) {
        let token = crypto.randomBytes(128).toString('hex');
        let hash = crypto
          .createHash('sha256')
          .update(token)
          .digest('hex');
        if (
          user.resetPasswordToken === '' ||
          user.resetPasswordExpires < Date.now()
        ) {
          user.set({
            resetPasswordToken: hash,
            resetPasswordExpires: Date.now() + 30 * 60 * 1000
          });
        } else {
          user.set({
            resetPasswordToken: hash
          });
        }
        user.save().then(user => {
          sendEmail({
            to: email,
            subject: 'Password reset request',
            body:
              '<p><b>Click this link to reset your password - http://localhost:3000/reset-password?token=' +
              token +
              '</b></p>'
          });
          return res.status(200).json('success');
        });
      } else {
        return res.json({ msg: 'Password reset mail sent to ' + email });
      }
    })
    .catch(err => console.log(err));
};

module.exports = resetPasswordRequest;
