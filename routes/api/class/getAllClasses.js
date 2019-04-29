const Class = require('../../../models/Class');

const getAllClasses = (req, res) => {
  Class.find({})
    .populate('classGroup')
    .lean()
    .then(classes => {
      if (!classes) {
        errors.msg = 'No class found';
        return res.status(404).json();
      } else {
        res.json(classes);
      }
    })
    .catch(err => res.status(404).json(err));
};

module.exports = getAllClasses;
