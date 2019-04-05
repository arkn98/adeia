const { accountTypes } = require('../../../models/User');
const Course = require('../../../models/Course');

const getAllCourses = (req, res) => {
  if (req.user.accountType === accountTypes.ADMIN) {
    Course.find({})
      .lean()
      .then(courses => {
        if (!courses) {
          errors.msg = 'No course found';
          return res.status(404).json();
        } else {
          res.json(courses);
        }
      })
      .catch(err => res.status(404).json(err));
  } else {
    return res
      .status(400)
      .json({ msg: 'You do not have sufficient permissions' });
  }
};

module.exports = getAllCourses;
