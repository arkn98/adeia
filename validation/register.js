const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.designation = !isEmpty(data.designation) ? data.designation : '';
  data.category = !isEmpty(data.category) ? data.category : '';

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
