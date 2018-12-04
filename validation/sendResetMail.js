const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateResetMailInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';

  if (!validator.isEmail(data.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Enter an email address to reset password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
