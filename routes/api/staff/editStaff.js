const { validationResult } = require('express-validator/check');
const User = require('../../../models/User');

const editStaff = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  User.findOne({ staffId: req.body.staffIdSelect }).then(staffItem => {
    if (!staffItem) {
      errors.staffIdSelect = 'Staff ID does not exist';
      return res.status(400).json(errors);
    }
    staffItem.set({
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      category: req.body.category,
      staffType: req.body.staffType
    });

    staffItem
      .save()
      .then(result => res.status(200).json('success'))
      .catch(err => console.log(err));
  });
};

module.exports = editStaff;
