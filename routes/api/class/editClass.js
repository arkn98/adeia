const { validationResult } = require('express-validator/check');
const Class = require('../../../models/Class');

const editClass = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  Class.findOne({ classCode: req.body.classCodeSelect }).then(classItem => {
    if (!classItem) {
      errors.classCodeSelect = 'Class does not exist';
      return res.status(400).json(errors);
    }
    Class.findOne({ classCode: req.body.classCodeUpdate }).then(
      newClassItem => {
        if (newClassItem) {
          errors.classCodeUpdate = 'Class code already in use';
          return res.status(400).json(errors);
        }
        classItem.set({
          classCode: req.body.classCodeUpdate,
          nameOfClass: req.body.nameOfClassUpdate
        });
        classItem
          .save()
          .then(result => res.status(200).json('success'))
          .catch(err => console.log(err));
      }
    );
  });
};

module.exports = editClass;
