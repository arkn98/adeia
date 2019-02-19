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

const {
  getTimetableDayEntries,
  getTimetableEntries,
  deleteExistingEntries
} = require('../../services/timetable');

// @route   GET   api/timetable/test
// @desc    Tests admin route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Timetable works' }));

router.post(
  '/add-timetable',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      let { timetable } = req.body;
      let toAdd = [];
      deleteExistingEntries(req.body.classId)
        .then(result => {
          timetable.forEach((day, dayIndex) => {
            day.forEach((hour, hourIndex) => {
              hour.course.forEach((tempCourseObj, courseIndex) => {
                toAdd.push({
                  class: req.body.classId,
                  day: dayIndex + 1,
                  hour: hour.start,
                  duration: hour.duration,
                  course: tempCourseObj.courseCode,
                  staff: tempCourseObj.handlingStaff,
                  staffRole: 'MAIN'
                });
                if (Array.isArray(tempCourseObj.additionalStaff)) {
                  tempCourseObj.additionalStaff.forEach(addtlStaff => {
                    toAdd.push({
                      class: req.body.classId,
                      day: dayIndex + 1,
                      hour: hour.start,
                      duration: hour.duration,
                      course: tempCourseObj.courseCode,
                      staff: addtlStaff,
                      staffRole: 'ADDITIONAL'
                    });
                  });
                } else if (typeof tempCourseObj.additionalStaff === 'string') {
                  toAdd.push({
                    class: req.body.classId,
                    day: dayIndex + 1,
                    hour: hour.start,
                    duration: hour.duration,
                    course: tempCourseObj.courseCode,
                    staff: tempCourseObj.additionalStaff,
                    staffRole: 'ADDITIONAL'
                  });
                }
              });
            });
          });
          Timetable.insertMany(toAdd, { ordered: false })
            .then(result => {
              console.log(result);
              return res.json({ msg: 'added' });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

router.post(
  '/add-timetable-day',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      //add validation
      /* const { errors, isValid } = validateAddTimetableInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      } */
      /* Timetable.findOne({
        class: req.body.classId,
        day: req.body.day,
        hour: req.body.hour
      }).then(timetable => {
        if (!timetable) { */
      let newTimetable = new Timetable({
        class: req.body.classId,
        day: req.body.day,
        hour: req.body.hour,
        duration: req.body.duration,
        course: req.body.course,
        staff: req.body.staff,
        staffRole: req.body.staffRole
      });
      //console.log(newTimetable);
      newTimetable
        .save()
        .then(timetable => {
          getTimetableEntries(req.body.classId).then(result => {
            return res.status(200).json(result);
          });
        })
        .catch(err => console.log(err));
      /* } else {
          timetable.set({
            course: req.body.course,
            staff: req.body.staff,
            staffRole: req.body.staffRole
          });
          timetable
            .save()
            .then(timetable => res.json(timetable))
            .catch(err => console.log(err));
        } */
      /* }); */
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

// returns all entries for a week
router.get(
  '/get-timetable',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const errors = {};
      //add validation
      getTimetableEntries(req.query.classId).then(result => {
        return res.status(200).json(result);
      });
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

router.get(
  '/get-timetable-day',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const errors = {};
      //add validation
      getTimetableDayEntries(req.query.classId, req.query.day)
        .then(timetable => {
          if (timetable === -1) {
            errors.msg = 'Timetable not found';
            return res.status(404).json(errors);
          }
          return res.status(200).json(timetable);
        })
        .catch(err => console.log(err));
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
