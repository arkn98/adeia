const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { accountTypes } = require('../../../models/User');
const getAllLeaveTypes = require('./getAllLeaveTypes');
const addLeaveType = require('./addLeaveType');
const editLeaveType = require('./editLeaveType');
const { checkRole: permit } = require('../../utils');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    body('leaveType')
      .exists()
      .withMessage('Leave type cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Leave type cannot be empty'),
    body('noOfDays')
      .exists()
      .withMessage('No. of days cannot be empty')
      .not()
      .isEmpty()
      .withMessage('No. of days cannot be empty')
      .isNumeric()
      .withMessage('No. of days can only contain numbers')
  ],
  addLeaveType
);

router.get(
  '/get-all',
  passport.authenticate('jwt', { session: false }),
  getAllLeaveTypes
);

router.patch(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    body('leaveTypeSelect')
      .exists()
      .withMessage('No leave type selected')
      .not()
      .isEmpty()
      .withMessage('No leave type selected')
      .isAlphanumeric()
      .withMessage('Leave type can only contain letters and numbers')
      .isLength({ min: 2 })
      .withMessage('Leave type must be atleast 2 characters long'),
    body('noOfDaysUpdate')
      .exists()
      .withMessage('No. of days cannot be empty')
      .not()
      .isEmpty()
      .withMessage('No. of days cannot be empty')
      .isNumeric()
      .withMessage('No. of days can only contain numbers')
  ],
  editLeaveType
);

module.exports = router;
