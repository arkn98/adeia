const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { staffTypes, accountTypes } = require('../../../models/User');
const selfUpdateAccount = require('./selfUpdateAccount');
const selfUpdatePassword = require('./selfUpdatePassword');
const activateAccount = require('./activateAccount');
const clearResetToken = require('./clearResetToken');
const getCurrent = require('./getCurrent');
const login = require('./login');
const { checkRole: permit } = require('../../utils');

router.patch(
  '/update-account',
  passport.authenticate('jwt', { session: false }),
  [
    body('email')
      .exists()
      .withMessage('Email cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Enter a valid email address'),
    body('name')
      .exists()
      .withMessage('Name cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Name cannot be empty')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('designation')
      .not()
      .isEmpty()
      .withMessage('Designation cannot be empty')
  ],
  selfUpdateAccount
);

router.patch(
  '/update-password',
  passport.authenticate('jwt', { session: false }),
  [
    body('currentpassword')
      .exists()
      .withMessage('Current Password cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Current Password cannot be empty'),
    body('newpassword')
      .exists()
      .withMessage('New Password cannot be empty')
      .not()
      .isEmpty()
      .withMessage('New Password cannot be empty')
      .isLength({ min: 8 })
      .withMessage('Password must be atleast 8 characters long')
  ],
  selfUpdatePassword
);

router.post(
  '/activate',
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
    body('email')
      .exists()
      .withMessage('Email cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Enter a valid email address'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password cannot be empty')
      .isLength({ min: 8 })
      .withMessage('Password must be atleast 8 characters long'),
    body('password2')
      .not()
      .isEmpty()
      .withMessage('Confirm Password cannot be empty')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords must match');
        }
        return true;
      })
  ],
  activateAccount
);

router.put(
  '/clear-reset-token',
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
  clearResetToken
);

router.get(
  '/get-current',
  passport.authenticate('jwt', { session: false }),
  getCurrent
);

router.post(
  '/login',
  [
    body('email')
      .exists()
      .withMessage('Email cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Enter a valid email address'),
    body('password')
      .exists()
      .withMessage('Password cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Password cannot be empty')
  ],
  login
);

module.exports = router;
