/* const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateAddLeaveInput(data) {
  let errors = {};

  data.leaveType = !isEmpty(data.name) ? data.name : '';
  data.noOfDays = !isEmpty(data.designation) ? data.designation : '';
  data.from = !isEmpty(data.category) ? data.category : '';
  data.to = !isEmpty(data.email) ? data.email : '';
  data.isVacationSelected = !isEmpty(data.password) ? data.password : '';
  data.reason = !isEmpty(data.password2) ? data.password2 : '';
  data.addressForCommunication = !isEmpty(data.password2) ? data.password2 : '';

  if (!validator.isEmail(data.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = 'Password must be atleast 8 characters long';
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email cannot be empty';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password cannot be empty';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password cannot be empty';
  }

  if (!validator.isNumeric(data.staffId)) {
    errors.staffId = 'Staff Id can only contain numbers';
  }

  if (!validator.isLength(data.staffId, { min: 1 })) {
    errors.staffId = 'Staff Id cannot be empty';
  }

  if (!validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = 'Name must be between 2 and 50 characters';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name cannot be empty';
  }

  if (validator.isEmpty(data.designation)) {
    errors.designation = 'Designation cannot be empty';
  }

  if (validator.isEmpty(data.category)) {
    errors.category = 'Category cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
 */
