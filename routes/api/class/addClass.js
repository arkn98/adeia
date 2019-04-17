const { validationResult } = require('express-validator/check');
const Class = require('../../../models/Class');

const addClass = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  Class.findOne({
    classCode: req.body.classCode.toUpperCase()
  }).then(classObj => {
    if (classObj) {
      errors.classCode = 'Class already exists';
      return res.status(400).json(errors);
    } else {
      const newClass = new Class({
        nameOfClass: req.body.nameOfClass,
        classCode: req.body.classCode.toUpperCase()
      });
      newClass
        .save()
        .then(classObj => res.json('success'))
        .catch(err => console.log(err));
    }
  });
};

module.exports = addClass;
