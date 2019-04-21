const { validationResult } = require('express-validator/check');

const User = require('../../../models/User');

const clearResetToken = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  User.findOne({
    staffId: req.body.staffId
  })
    .then(user => {
      if (user) {
        user.set({
          resetPasswordExpires: -1,
          resetPasswordToken: ''
        });
        user
          .save()
          .then(res => res.status(200).json('Clear token success'))
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      } else {
        return res.status(400).json('user not found');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = clearResetToken;
