const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { accountTypes } = require('../../../models/User');
const { leaveTypes } = require('../../../models/Leave');
const addLeave = require('./addLeave');
const getLeaves = require('./getLeaves');
const { checkRole: permit } = require('../../utils');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.STAFF),
  [
    body('staffId')
      .exists()
      .withMessage('Staff ID cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Staff ID cannot be empty')
      .isLength({ min: 1 })
      .withMessage('Staff ID must be atleast 1 character long')
      .isNumeric()
      .withMessage('Staff ID can only contain numbers'),
    body('from')
      .exists()
      .withMessage('From Date cannot be empty')
      .not()
      .isEmpty()
      .withMessage('From Date cannot be empty')
      .isISO8601()
      .withMessage('Invalid Date'),
    body('to')
      .exists()
      .withMessage('To Date cannot be empty')
      .not()
      .isEmpty()
      .withMessage('To Date cannot be empty')
      .isISO8601()
      .withMessage('Invalid Date'),
    body('leaveType')
      .exists()
      .withMessage('Leave type cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Leave type cannot be empty')
      .isIn(Object.values(leaveTypes))
      .withMessage('Invalid Leave type'),
    body('noOfDays')
      .exists()
      .withMessage('No. of days cannot be empty')
      .not()
      .isEmpty()
      .withMessage('No. of days cannot be empty')
      .isNumeric()
      .withMessage('No. of days can only contain numbers'),
    body('reason')
      .exists()
      .withMessage('Reason cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Reason cannot be empty'),
    body('isVacation')
      .exists()
      .withMessage('Is Vacation cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Is Vacation cannot be empty')
      .isBoolean()
      .withMessage('Invalid value'),
    body('reason')
      .optional({ nullable: true })
      .exists()
      .withMessage('Reason cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Reason cannot be empty')
  ],
  addLeave
);

router.get(
  '/get-leaves',
  passport.authenticate('jwt', { session: false }),
  getLeaves
);

module.exports = router;
