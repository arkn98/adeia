const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateAddClassInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.code = !isEmpty(data.code) ? data.code : '';

  if (validator.isEmpty(data.name)) {
    errors.name = 'Class name cannot be empty';
  }

  if (validator.isEmpty(data.code)) {
    errors.code = 'Class code cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
