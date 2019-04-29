const { validationResult } = require('express-validator/check');
const ClassGroup = require('../../../models/ClassGroup');

const editClassGroup = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  ClassGroup.findOne({ classGroupCode: req.body.classGroupCodeSelect }).then(
    classGroupItem => {
      if (!classGroupItem) {
        errors.classGroupCodeSelect = 'Class group does not exist';
        return res.status(400).json(errors);
      }
      ClassGroup.findOne({
        classGroupCode: req.body.classGroupCodeUpdate
      }).then(newClassGroupItem => {
        if (newClassGroupItem) {
          errors.classGroupCodeUpdate = 'Class group code already in use';
          return res.status(400).json(errors);
        }
        classGroupItem.set({
          classGroupCode: req.body.classGroupCodeUpdate,
          nameOfClassGroup: req.body.nameOfClassGroupUpdate
        });
        classGroupItem
          .save()
          .then(result => res.status(200).json('success'))
          .catch(err => console.log(err));
      });
    }
  );
};

module.exports = editClassGroup;
