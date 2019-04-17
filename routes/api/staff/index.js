const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { staffTypes, accountTypes } = require('../../../models/User');
const getAllStaff = require('./getAllStaff');
const editStaff = require('./editStaff');
const { checkRole: permit } = require('../../utils');

router.get(
  '/get-all',
  passport.authenticate('jwt', { session: false }),
  getAllStaff
);

router.patch(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    body('staffIdSelect')
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
    body('email')
      .exists()
      .withMessage('Email cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Enter a valid email address'),
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
  editStaff
);

module.exports = router;
