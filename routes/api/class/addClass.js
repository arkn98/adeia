const { validationResult } = require('express-validator/check');
const Class = require('../../../models/Class');
const ClassGroup = require('../../../models/ClassGroup');

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
      ClassGroup.findOne({ classGroupCode: req.body.classGroupCode }).then(
        classGroup => {
          if (!classGroup) {
            errors.classGroupCode = 'Class group not found';
            return res.status(400).json(errors);
          }
          const newClass = new Class({
            nameOfClass: req.body.nameOfClass,
            classCode: req.body.classCode.toUpperCase(),
            classGroup: classGroup._id
          });
          newClass
            .save()
            .then(classObj => res.json('success'))
            .catch(err => console.log(err));
        }
      );
    }
  });
};

module.exports = addClass;
