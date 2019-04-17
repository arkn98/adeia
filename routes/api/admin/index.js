const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { staffTypes, accountTypes } = require('../../../models/User');
const addAccount = require('./addAccount');
const addStaff = require('./addStaff');
const { checkRole: permit } = require('../../utils');

router.post(
  '/add-account',
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
      .withMessage('Staff ID can only contain numbers'),
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
      .withMessage('Designation cannot be empty'),
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
      }),
    body('category')
      .not()
      .isEmpty()
      .withMessage('Category cannot be empty'),
    body('staffType')
      .not()
      .isEmpty()
      .withMessage('Staff Type cannot be empty')
      .isIn(Object.values(staffTypes))
      .withMessage('Invalid Staff Type'),
    body('accountType')
      .not()
      .isEmpty()
      .withMessage('Account Type cannot be empty')
      .isIn(Object.values(accountTypes))
      .withMessage('Invalid Account Type')
  ],
  addAccount
);

router.post(
  '/add-staff',
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
      .withMessage('Staff ID can only contain numbers'),
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
      .withMessage('Designation cannot be empty'),
    body('category')
      .not()
      .isEmpty()
      .withMessage('Category cannot be empty'),
    body('staffType')
      .not()
      .isEmpty()
      .withMessage('Staff Type cannot be empty')
      .isIn(Object.values(staffTypes))
      .withMessage('Invalid Staff Type')
  ],
  addStaff
);

module.exports = router;
