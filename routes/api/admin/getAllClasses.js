const { accountTypes } = require('../../../models/User');
const Class = require('../../../models/Class');

const getAllClasses = (req, res) => {
  if (req.user.accountType === accountTypes.ADMIN) {
    Class.find({})
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
  } else {
    return res
      .status(400)
      .json({ msg: 'You do not have sufficient permissions' });
  }
};

module.exports = getAllClasses;
