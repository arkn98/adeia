const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateAddLeaveInput(data) {
  let errors = {};

  data.staffId = !isEmpty(data.staffId) ? data.staffId : '';
  data.leaveType = !isEmpty(data.leaveType) ? data.leaveType : '';
  data.noOfDays = !isEmpty(data.noOfDays) ? data.noOfDays : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';
  data.reason = !isEmpty(data.reason) ? data.reason : '';

  if (validator.isEmpty(data.staffId)) {
    errors.staffId = 'Staff ID cannot be empty';
  }

  if (validator.isEmpty(data.leaveType)) {
    errors.leaveType = 'Leave type cannot be empty';
  }

  if (validator.isEmpty(data.noOfDays)) {
    errors.noOfDays = 'No. of days cannot be empty';
  }

  if (!validator.isNumeric(data.noOfDays)) {
    errors.noOfDays = 'Invalid entry';
  }

  if (validator.isEmpty(data.from)) {
    errors.from = 'From date cannot be empty';
  }

  if (validator.isEmpty(data.to)) {
    errors.to = 'To date cannot be empty';
  }

  if (validator.isEmpty(data.reason)) {
    errors.reason = 'Reason cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
