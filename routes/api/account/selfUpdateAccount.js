const { validationResult } = require('express-validator/check');
const User = require('../../../models/User');

const selfUpdateAccount = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user && user.staffId !== req.user.staffId) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      User.findOne({ staffId: req.user.staffId }).then(userObj => {
        if (!userObj) {
          errors.msg = 'Staff Not Found';
          return res.status(400).json(errors);
        } else {
          userObj.set({
            name: req.body.name,
            email: req.body.email,
            designation: req.body.designation
          });
          userObj
            .save()
            .then(user => res.status(200).json('success'))
            .catch(err => console.log(err));
        }
      });
    }
  });
};

module.exports = selfUpdateAccount;
