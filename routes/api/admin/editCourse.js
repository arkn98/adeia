const { validationResult } = require('express-validator/check');
const Course = require('../../../models/Course');
const { accountTypes } = require('../../../models/User');

const editCourse = (req, res) => {
  if (req.user.accountType === accountTypes.ADMIN) {
    const errors = validationResult(req).formatWith(({ msg }) => msg);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped());
    }
    Course.findOne({ courseCode: req.body.courseCodeSelect }).then(
      courseItem => {
        if (!courseItem) {
          errors.courseCodeSelect = 'Course does not exist';
          return res.status(400).json(errors);
        }
        courseItem.set({
          courseCode: req.body.courseCodeUpdate,
          nameOfCourse: req.body.nameOfCourseUpdate
        });
        courseItem
          .save()
          .then(result => res.status(200).json('success'))
          .catch(err => console.log(err));
      }
    );
  } else {
    return res
      .status(400)
      .json({ msg: 'You do not have sufficient permissions' });
  }
};

module.exports = editCourse;
