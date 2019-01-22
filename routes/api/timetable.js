const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

//load model
const Class = require('../../models/Class');
const Course = require('../../models/Course');
const User = require('../../models/User');
const Timetable = require('../../models/TestTimetable');

//load input validation
const validateAddTimetableInput = require('../../validation/addTimetable');

// @route   GET   api/timetable/test
// @desc    Tests admin route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Timetable works' }));

router.post(
  '/add-timetable',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      //add validation
      /* const { errors, isValid } = validateAddTimetableInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      } */
      Timetable.findOne({
        class: req.body.classId,
        day: req.body.day,
        hour: req.body.hour
      }).then(timetable => {
        if (!timetable) {
          let newTimetable = new Timetable({
            class: req.body.classId,
            day: req.body.day,
            hour: req.body.hour,
            course: req.body.course,
            staff: req.body.staff,
            staffRole: req.body.staffRole
          });
          //console.log(newTimetable);
          newTimetable
            .save()
            .then(timetable => res.json(timetable))
            .catch(err => console.log(err));
        } else {
          timetable.set({
            course: req.body.course,
            staff: req.body.staff,
            staffRole: req.body.staffRole
          });
          timetable
            .save()
            .then(timetable => res.json(timetable))
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

/* router.post(
  '/add-timetable',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const { errors, isValid } = validateAddTimetableInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      Timetable.findOne({ classCode: req.body.classCode }).then(timetable => {
        if (timetable) {
          errors.msg = 'Timetable already exists';
          return res.status(400).json(errors);
        } else {
          let obj = [];
          req.body.timetable.map((day, index) => {
            let dayarr = [];
            day.map((hour, index2) => {
              let hourobj = {
                courseCode: mongoose.Types.ObjectId(hour.courseCode),
                handlingStaff: mongoose.Types.ObjectId(hour.handlingStaffId),
                additionalStaff: []
              };
              if (
                typeof hour.additionalStaffId !== 'undefined' &&
                hour.additionalStaffId.length > 0
              ) {
                hour.additionalStaffId.map(id => {
                  hourobj.additionalStaff.push(mongoose.Types.ObjectId(id));
                });
              }
              dayarr.push(hourobj);
            });
            obj.push(dayarr);
          });
          console.log(obj);
          let newTimetable = new Timetable({
            classCode: req.body.classCode,
            class: req.body.classId,
            timetable: obj
          });
          newTimetable
            .save()
            .then(timetable => res.json(timetable))
            .catch(err => console.log(err));
        }
      });
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
); */

router.get(
  '/get-timetable-day',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const errors = {};
      //add validation
      console.log(req.query);
      Timetable.find({ class: req.query.classId, day: req.query.day })
        .sort({ day: 1, hour: 1 })
        .populate({ path: 'class', select: 'classCode' })
        .populate({ path: 'course', select: 'courseCode' })
        .populate({ path: 'staff', select: 'staffId name' })
        .then(timetable => {
          if (timetable) {
            console.log(timetable);
            return res.status(200).json(timetable);
          } else {
            errors.msg = 'Timetable not found';
            return res.status(404).json(errors);
          }
        })
        .catch(err => res.status(404).json(err));
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

// @route   GET   api/timetable/get-classes
// @desc    Gets all class codes
// @access  Private
router.get(
  '/get-classes',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const errors = {};
      Class.find({})
        .lean()
        .then(classes => {
          if (!classes) {
            errors.msg = 'No class found';
            return res.status(404).json();
          } else {
            res.json(classes);
          }
        })
        .catch(err => res.status(404).json(err));
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

// @route   GET   api/timetable/get-courses
// @desc    Gets all courses
// @access  Private
router.get(
  '/get-courses',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const errors = {};
      Course.find({})
        .lean()
        .then(courses => {
          if (!courses) {
            errors.msg = 'No course found';
            return res.status(404).json();
          } else {
            res.json(courses);
          }
        })
        .catch(err => res.status(404).json(err));
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

// @route   GET   api/timetable/get-courses
// @desc    Gets all courses
// @access  Private
router.get(
  '/get-staff',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const errors = {};
      User.find({ accountType: 2 })
        .lean()
        .then(users => {
          if (!users) {
            errors.msg = 'No staff found';
            return res.status(404).json();
          } else {
            res.json(users);
          }
        })
        .catch(err => res.status(404).json(err));
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

module.exports = router;
