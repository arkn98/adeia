const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { accountTypes } = require('../../../models/User');
const getCurrent = require('./getCurrent');
const addProfile = require('./addProfile');
const setLoginAttempt = require('./setLoginAttempt');
const markAllAsRead = require('./markAllAsRead');
const markIndexAsRead = require('./markIndexAsRead');
const { checkRole: permit } = require('../../utils');

router.get('/', passport.authenticate('jwt', { session: false }), getCurrent);

router.get(
  '/mark-all-as-read',
  passport.authenticate('jwt', { session: false }),
  markAllAsRead
);

router.get(
  '/mark-index-as-read',
  passport.authenticate('jwt', { session: false }),
  markIndexAsRead
);

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
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
      .withMessage('Staff ID can only contain numbers')
  ],
  addProfile
);

router.post('/set-login-attempts', setLoginAttempt);

module.exports = router;
