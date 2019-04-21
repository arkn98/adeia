const { validationResult } = require('express-validator/check');

const User = require('../../../models/User');

const addStaff = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  User.findOne({ staffId: req.body.staffId })
    .then(user => {
      if (user) {
        errors.staffId = 'Staff already exists';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          staffId: req.body.staffId,
          name: req.body.name,
          designation: req.body.designation,
          category: req.body.category,
          staffType: req.body.staffType
        });

        newUser
          .save()
          .then(user => res.status(200).json('success'))
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = addStaff;
