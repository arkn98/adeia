const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateAddCourseInput(data) {
  let errors = {};

  data.nameOfCourse = !isEmpty(data.nameOfCourse) ? data.nameOfCourse : '';
  data.courseCode = !isEmpty(data.courseCode) ? data.courseCode : '';

  if (validator.isEmpty(data.nameOfCourse)) {
    errors.nameOfCourse = 'Course name cannot be empty';
  }

  if (validator.isEmpty(data.courseCode)) {
    errors.courseCode = 'Course code cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
