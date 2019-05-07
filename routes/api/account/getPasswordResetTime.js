const { validationResult } = require('express-validator/check');
const crypto = require('crypto');
const User = require('../../../models/User');

const getPasswordResetTime = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.json({ pwdResetTime: -1 });
  }

  User.findOne({ staffId: req.query.staffId })
    .then(user => {
      if (!user) {
        res.json({ pwdResetTime: -1 });
      } else {
        res.json({ pwdResetTime: user.pwdResetTime });
      }
    })
    .catch(err => res.json({ pwdResetTime: -1 }));
};

module.exports = getPasswordResetTime;
