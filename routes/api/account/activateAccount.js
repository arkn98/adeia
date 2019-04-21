const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../../../models/User');

const activateAccount = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already in use';
        return res.status(400).json(errors);
      }
      User.findOne({ staffId: req.body.staffId })
        .then(user => {
          if (user.activated == true) {
            errors.staffId = 'Staff account already activated';
            return res.status(400).json(errors);
          }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              user.set({
                activated: true,
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(user => res.status(200).json('success'))
                .catch(err => console.log(err));
            });
          });
        })
        .catch(err => {
          errors.staffId = 'Staff account not found';
          return res.status(400).json(errors);
        });
    })
    .catch(err => {
      errors.staffId = 'Staff account not found';
      return res.status(400).json(errors);
    });
};

module.exports = activateAccount;
