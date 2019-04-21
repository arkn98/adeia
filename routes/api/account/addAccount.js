const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../../../models/User');

const addAccount = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  User.findOne({
    $or: [{ staffId: req.body.staffId }, { email: req.body.email }]
  })
    .then(user => {
      if (user) {
        if (user.staffId === req.body.staffId) {
          errors.staffId = 'Staff ID already exists';
          return res.status(400).json(errors);
        } else if (user.email === req.body.email) {
          errors.email = 'Email already in use';
          return res.status(400).json(errors);
        }
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            const newUser = new User({
              accountType: req.body.accountType,
              email: req.body.email,
              staffId: req.body.staffId,
              name: req.body.name,
              designation: req.body.designation,
              category: req.body.category,
              activated: true,
              password: hash,
              staffType: req.body.staffType
            });
            newUser
              .save()
              .then(user => res.json('success'))
              .catch(err => {
                console.log(err);
                res.status(500).json(err);
              });
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = addAccount;
