const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateAddTimetableInput(data) {
  let errors = {};

  data.classCode = !isEmpty(data.classCode) ? data.classCode : '';

  if (validator.isEmpty(data.classCode)) {
    errors.classCode = 'Class code cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
