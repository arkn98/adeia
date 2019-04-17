const { validationResult } = require('express-validator/check');
const Course = require('../../../models/Course');

const addCourse = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  Course.findOne({
    courseCode: req.body.courseCode.toUpperCase()
  }).then(courseObj => {
    if (courseObj) {
      errors.courseCode = 'Course already exists';
      return res.status(400).json(errors);
    } else {
      const newCourse = new Course({
        nameOfCourse: req.body.nameOfCourse,
        courseCode: req.body.courseCode.toUpperCase()
      });
      newCourse
        .save()
        .then(classObj => res.json('success'))
        .catch(err => console.log(err));
    }
  });
};

module.exports = addCourse;
