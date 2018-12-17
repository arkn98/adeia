const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateResetPasswordInput(data) {
  let errors = {};

  data.staffId = !isEmpty(data.staffId) ? data.staffId : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!validator.isLength(data.staffId, { min: 1 })) {
    errors.staffId = 'Staff Id cannot be empty';
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = 'Password must be atleast 8 characters long';
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password cannot be empty';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
