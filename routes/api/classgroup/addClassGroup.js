const { validationResult } = require('express-validator/check');
const ClassGroup = require('../../../models/ClassGroup');

const addClassGroup = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  ClassGroup.findOne({
    classGroupCode: req.body.classGroupCode.toUpperCase()
  }).then(classGroupObj => {
    if (classGroupObj) {
      errors.classGroupCode = 'Class group already exists';
      return res.status(400).json(errors);
    } else {
      const newClassGroup = new ClassGroup({
        nameOfClassGroup: req.body.nameOfClassGroup,
        classGroupCode: req.body.classGroupCode.toUpperCase()
      });
      newClassGroup
        .save()
        .then(classGroupObj => res.json('success'))
        .catch(err => console.log(err));
    }
  });
};

module.exports = addClassGroup;
