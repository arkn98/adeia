const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { accountTypes } = require('../../../models/User');
const addCourse = require('./addCourse');
const getAllCourses = require('./getAllCourses');
const editCourse = require('./editCourse');
const { checkRole: permit } = require('../../utils');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    body('courseCode')
      .exists()
      .withMessage('Course Code cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Course Code cannot be empty')
      .isAlphanumeric()
      .withMessage('Course Code can only contain letters and numbers')
      .isLength({ min: 6 })
      .withMessage('Course Code must be atleast 6 characters long'),
    body('nameOfCourse')
      .exists()
      .withMessage('Course Name cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Course Name cannot be empty')
      .isLength({ min: 2 })
      .withMessage('Course Name must be atleast 2 characters long')
  ],
  addCourse
);

router.patch(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
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
  ],
  editCourse
);

router.get(
  '/get-all',
  passport.authenticate('jwt', { session: false }),
  getAllCourses
);

module.exports = router;
