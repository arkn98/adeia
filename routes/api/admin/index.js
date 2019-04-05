const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');

const { staffTypes, accountTypes } = require('../../../models/User');
const addAccount = require('./addAccount');
const addClass = require('./addClass');
const addCourse = require('./addCourse');
const addStaff = require('./addStaff');
const getAllClasses = require('./getAllClasses');
const getAllCourses = require('./getAllCourses');
const getAllStaff = require('./getAllStaff');
const editClass = require('./editClass');
const editCourse = require('./editCourse');
const editStaff = require('./editStaff');

router.post(
  '/add-account',
  passport.authenticate('jwt', { session: false }),
  [
    body('staffId')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Staff ID cannot be empty')
      .isLength({ min: 1 })
      .withMessage('Staff ID must be atleast 1 character long')
      .isNumeric()
      .withMessage('Staff ID can only contain numbers'),
    body('email')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Enter a valid email address'),
    body('name')
      .exists()
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
  [
    body('staffId')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Staff ID cannot be empty')
      .isLength({ min: 1 })
      .withMessage('Staff ID must be atleast 1 character long')
      .isNumeric()
      .withMessage('Staff ID can only contain numbers'),
    body('name')
      .exists()
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

router.post(
  '/add-class',
  passport.authenticate('jwt', { session: false }),
  [
    body('classCode')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Class Code cannot be empty')
      .isAlphanumeric()
      .withMessage('Class Code can only contain letters and numbers')
      .isLength({ min: 2 })
      .withMessage('Class Code must be atleast 2 characters long'),
    body('nameOfClass')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Class Name cannot be empty')
      .isLength({ min: 2 })
      .withMessage('Class Name must be atleast 2 characters long')
  ],
  addClass
);

router.post(
  '/add-course',
  passport.authenticate('jwt', { session: false }),
  [
    body('courseCode')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Course Code cannot be empty')
      .isAlphanumeric()
      .withMessage('Course Code can only contain letters and numbers')
      .isLength({ min: 6 })
      .withMessage('Course Code must be atleast 6 characters long'),
    body('nameOfCourse')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Course Name cannot be empty')
      .isLength({ min: 2 })
      .withMessage('Course Name must be atleast 2 characters long')
  ],
  addCourse
);

router.get(
  '/get-classes',
  passport.authenticate('jwt', { session: false }),
  getAllClasses
);

router.get(
  '/get-staff',
  passport.authenticate('jwt', { session: false }),
  getAllStaff
);

router.get(
  '/get-courses',
  passport.authenticate('jwt', { session: false }),
  getAllCourses
);

router.patch(
  '/edit-class',
  passport.authenticate('jwt', { session: false }),
  [
    body('classCodeSelect')
      .exists()
      .not()
      .isEmpty()
      .withMessage('No Class Selected')
      .isAlphanumeric()
      .withMessage('Class Code can only contain letters and numbers')
      .isLength({ min: 2 })
      .withMessage('Class Code must be atleast 2 characters long'),
    body('classCodeUpdate')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Class Code cannot be empty')
      .isAlphanumeric()
      .withMessage('Class Code can only contain letters and numbers')
      .isLength({ min: 2 })
      .withMessage('Class Code must be atleast 2 characters long'),
    body('nameOfClassUpdate')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Class Name cannot be empty')
      .isLength({ min: 2 })
      .withMessage('Class Name must be atleast 2 characters long')
  ],
  editClass
);

router.patch(
  '/edit-staff',
  passport.authenticate('jwt', { session: false }),
  [
    body('staffIdSelect')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Staff ID cannot be empty')
      .isLength({ min: 1 })
      .withMessage('Staff ID must be atleast 1 character long')
      .isNumeric()
      .withMessage('Staff ID can only contain numbers'),
    body('name')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Name cannot be empty')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('email')
      .exists()
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

router.patch(
  '/edit-course',
  passport.authenticate('jwt', { session: false }),
  [
    body('courseCodeSelect')
      .exists()
      .not()
      .isEmpty()
      .withMessage('No Course Selected')
      .isAlphanumeric()
      .withMessage('Course Code can only contain letters and numbers')
      .isLength({ min: 6 })
      .withMessage('Class Code must be atleast 6 characters long'),
    body('courseCodeUpdate')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Course Code cannot be empty')
      .isAlphanumeric()
      .withMessage('Course Code can only contain letters and numbers')
      .isLength({ min: 6 })
      .withMessage('Course Code must be atleast 6 characters long'),
    body('nameOfCourseUpdate')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Course Name cannot be empty')
      .isLength({ min: 2 })
      .withMessage('Course Name must be atleast 2 characters long')
  ],
  editCourse
);

module.exports = router;
