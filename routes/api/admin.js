const express = require('express');
const router = express.Router();
const passport = require('passport');

//load model
const Class = require('../../models/Class');
const Course = require('../../models/Course');
const User = require('../../models/User');

//load input validation
const validateAddClassInput = require('../../validation/addClass');
const validateAddCourseInput = require('../../validation/addCourse');

// @route   GET   api/admin/test
// @desc    Tests admin route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Admin works' }));

// @route   POST   api/admin/class/add
// @desc    Tests admin route
// @access  Private
router.post(
  '/class/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const { errors, isValid } = validateAddClassInput(req.body);
      //check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      Class.findOne({
        classCode: req.body.classCode,
        nameOfClass: req.body.nameOfClass
      }).then(classObj => {
        if (classObj) {
          /* classObj.set({ nameOfClass: req.body.nameOfClass });
          classObj
            .save()
            .then(classObj => res.json(classObj))
            .catch(err => console.log(err)); */
          errors.classCode = 'Class already exists';
          return res.status(400).json(errors);
        } else {
          const newClass = new Class({
            nameOfClass: req.body.nameOfClass,
            classCode: req.body.classCode
          });
          newClass
            .save()
            .then(classObj => res.json(classObj))
            .catch(err => console.log(err));
        }
      });
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

// @route   POST   api/admin/class/add
// @desc    Tests admin route
// @access  Private
router.post(
  '/course/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const { errors, isValid } = validateAddCourseInput(req.body);
      //check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      Class.findOne({
        courseCode: req.body.courseCode,
        nameOfCource: req.body.nameOfCource
      }).then(courseObj => {
        if (courseObj) {
          /* courseObj.set({ nameOfCourse: req.body.nameOfCourse });
          courseObj
            .save()
            .then(courseObj => res.json(courseObj))
            .catch(err => console.log(err)); */
          errors.courseCode = 'Course already exists';
          return res.status(400).json(errors);
        } else {
          const newClass = new Course({
            nameOfCourse: req.body.nameOfCourse,
            courseCode: req.body.courseCode
          });
          newClass
            .save()
            .then(courseObj => res.json(courseObj))
            .catch(err => console.log(err));
        }
      });
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

module.exports = router;
