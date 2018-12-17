const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateResetTokenInput(data) {
  let errors = {};

  console.log(data.token);
  data.token = !isEmpty(data.token) ? data.token : '';

  if (validator.isEmpty(data.token)) {
    errors.token = 'Token cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
