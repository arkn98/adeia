const Course = require('../../../models/Course');

const getAllCourses = (req, res) => {
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
};

module.exports = getAllCourses;
