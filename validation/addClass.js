const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateAddClassInput(data) {
  let errors = {};

  data.nameOfClass = !isEmpty(data.nameOfClass) ? data.nameOfClass : '';
  data.classCode = !isEmpty(data.classCode) ? data.classCode : '';

  if (validator.isEmpty(data.nameOfClass)) {
    errors.nameOfClass = 'Class name cannot be empty';
  }

  if (validator.isEmpty(data.classCode)) {
    errors.classCode = 'Class code cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
