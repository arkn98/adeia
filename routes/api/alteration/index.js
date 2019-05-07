const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { accountTypes } = require('../../../models/User');
const { leaveTypes } = require('../../../models/Leave');
const getAlterations = require('./getAlterations');
const setAlterationAsViewed = require('./setAlterationAsViewed');
const setAlterationAccepted = require('./setAlterationAccepted');
const setAlterationRejected = require('./setAlterationRejected');
const { checkRole: permit } = require('../../utils');

/* router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.STAFF),
  upload.single('document'),
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
      .withMessage('Invalid value')
    /* body('address')
      .optional({ nullable: true,  })
      .exists()
      .withMessage('Address cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Address cannot be empty') **
  ],
  addLeave
); */

router.get(
  '/get-alterations',
  passport.authenticate('jwt', { session: false }),
  getAlterations
);

router.get(
  '/set-as-viewed',
  passport.authenticate('jwt', { session: false }),
  setAlterationAsViewed
);

router.get(
  '/set-accepted',
  passport.authenticate('jwt', { session: false }),
  setAlterationAccepted
);

router.get(
  '/set-rejected',
  passport.authenticate('jwt', { session: false }),
  setAlterationRejected
);

module.exports = router;
