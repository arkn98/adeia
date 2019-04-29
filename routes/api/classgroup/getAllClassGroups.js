const ClassGroup = require('../../../models/ClassGroup');

const getAllClassGroups = (req, res) => {
  ClassGroup.find({})
    .lean()
    .then(classgroups => {
      if (!classgroups) {
        errors.msg = 'No class found';
        return res.status(404).json();
      } else {
        res.json(classgroups);
      }
    })
    .catch(err => res.status(404).json(err));
};

module.exports = getAllClassGroups;
