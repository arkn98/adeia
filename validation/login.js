const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isEmail(data.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email cannot be empty';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
