const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { accountTypes } = require('../../../models/User');
const { holidayTypes } = require('../../../models/Holiday');
const addHoliday = require('./addHoliday');
const getAllHolidays = require('./getAllHolidays');
const updateHolidays = require('./updateHolidays');
const { checkRole: permit } = require('../../utils');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    body('holidayType')
      .exists()
      .withMessage('Holiday type cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Holiday type cannot be empty')
      .isIn(Object.values(holidayTypes))
      .withMessage('Invalid holiday type'),
    body('date')
      .exists()
      .withMessage('Date cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Date cannot be empty')
      .isISO8601()
      .withMessage('Invalid Date'),
    body('description')
      .exists()
      .withMessage('Description cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Description cannot be empty')
  ],
  addHoliday
);

router.patch(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  /* [
    body('courseCodeSelect')
      .exists()
      .withMessage('No Course Selected')
      .not()
      .isEmpty()
      .withMessage('No Course Selected')
      .isAlphanumeric()
      .withMessage('Course Code can only contain letters and numbers')
      .isLength({ min: 6 })
      .withMessage('Class Code must be atleast 6 characters long'),
    body('courseCodeUpdate')
      .exists()
      .withMessage('Course Code cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Course Code cannot be empty')
      .isAlphanumeric()
      .withMessage('Course Code can only contain letters and numbers')
      .isLength({ min: 6 })
      .withMessage('Course Code must be atleast 6 characters long'),
    body('nameOfCourseUpdate')
      .exists()
      .withMessage('Course Name cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Course Name cannot be empty')
      .isLength({ min: 2 })
      .withMessage('Course Name must be atleast 2 characters long')
  ], */
  updateHolidays
);

router.get(
  '/get-all',
  passport.authenticate('jwt', { session: false }),
  getAllHolidays
);

module.exports = router;
