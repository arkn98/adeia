const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { staffTypes, accountTypes } = require('../../../models/User');
const getAllLeaveAllocations = require('./getAllLeaveAllocations');
const editLeaveAllocation = require('./editLeaveAllocation');
const { checkRole: permit } = require('../../utils');

router.get(
  '/get-all',
  passport.authenticate('jwt', { session: false }),
  getAllLeaveAllocations
);

router.patch(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    body('staffTypeSelect')
      .not()
      .isEmpty()
      .withMessage('Staff Type cannot be empty')
      .isIn(Object.values(staffTypes))
      .withMessage('Invalid Staff Type'),
    body('leaveTypesAllowedUpdate')
      .exists()
      .withMessage('Allowed leave types cannot be empty')
  ],
  editLeaveAllocation
);

module.exports = router;
