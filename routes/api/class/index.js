const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { accountTypes } = require('../../../models/User');
const addClass = require('./addClass');
const getAllClasses = require('./getAllClasses');
const editClass = require('./editClass');
const { checkRole: permit } = require('../../utils');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    body('classCode')
      .exists()
      .withMessage('Class Code cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Class Code cannot be empty')
      .isAlphanumeric()
      .withMessage('Class Code can only contain letters and numbers')
      .isLength({ min: 2 })
      .withMessage('Class Code must be atleast 2 characters long'),
    body('nameOfClass')
      .exists()
      .withMessage('Class Name cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Class Name cannot be empty')
      .isLength({ min: 2 })
      .withMessage('Class Name must be atleast 2 characters long')
  ],
  addClass
);

router.patch(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    body('classCodeSelect')
      .exists()
      .withMessage('No Class Selected')
      .not()
      .isEmpty()
      .withMessage('No Class Selected')
      .isAlphanumeric()
      .withMessage('Class Code can only contain letters and numbers')
      .isLength({ min: 2 })
      .withMessage('Class Code must be atleast 2 characters long'),
    body('classCodeUpdate')
      .exists()
      .withMessage('Class Code cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Class Code cannot be empty')
      .isAlphanumeric()
      .withMessage('Class Code can only contain letters and numbers')
      .isLength({ min: 2 })
      .withMessage('Class Code must be atleast 2 characters long'),
    body('nameOfClassUpdate')
      .exists()
      .withMessage('Class Name cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Class Name cannot be empty')
      .isLength({ min: 2 })
      .withMessage('Class Name must be atleast 2 characters long')
  ],
  editClass
);

router.get(
  '/get-all',
  passport.authenticate('jwt', { session: false }),
  getAllClasses
);

module.exports = router;
