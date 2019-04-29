const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { accountTypes } = require('../../../models/User');
const addClassGroup = require('./addClassGroup');
const getAllClassGroups = require('./getAllClassGroups');
const editClassGroup = require('./editClassGroup');
const { checkRole: permit } = require('../../utils');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    body('classGroupCode')
      .exists()
      .withMessage('Class Group code cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Class Group code cannot be empty')
      .isAlphanumeric()
      .withMessage('Class Group code can only contain letters and numbers')
      .isLength({ min: 2 })
      .withMessage('Class Group code must be atleast 2 characters long'),
    body('nameOfClassGroup')
      .exists()
      .withMessage('Class group name cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Class group name cannot be empty')
      .isLength({ min: 2 })
      .withMessage('Class group name must be atleast 2 characters long')
  ],
  addClassGroup
);

router.patch(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    body('classGroupCodeSelect')
      .exists()
      .withMessage('No Class group Selected')
      .not()
      .isEmpty()
      .withMessage('No Class group Selected')
      .isAlphanumeric()
      .withMessage('Class group code can only contain letters and numbers')
      .isLength({ min: 2 })
      .withMessage('Class group code must be atleast 2 characters long'),
    body('classGroupCodeUpdate')
      .exists()
      .withMessage('Class group code cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Class group code cannot be empty')
      .isAlphanumeric()
      .withMessage('Class group code can only contain letters and numbers')
      .isLength({ min: 2 })
      .withMessage('Class group code must be atleast 2 characters long'),
    body('nameOfClassGroupUpdate')
      .exists()
      .withMessage('Class group name cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Class group name cannot be empty')
      .isLength({ min: 2 })
      .withMessage('Class group name must be atleast 2 characters long')
  ],
  editClassGroup
);

router.get(
  '/get-all',
  passport.authenticate('jwt', { session: false }),
  getAllClassGroups
);

module.exports = router;
