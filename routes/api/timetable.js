const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const moment = require('moment');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const xlsx = require('node-xlsx').default;

moment().local();

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
  deleteExistingEntries,
  csvToTimetable
} = require('../../services/timetable');

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
  '/upload',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      let uploadFile = req.files.file;
      let fileName = uploadFile.name;
      let data = uploadFile.data;
      const toPath = `${__dirname}/../../uploads/${Date.now()}-${fileName}`;
      uploadFile.mv(toPath, err => {
        if (err) {
          return res.status(500).send(err);
        }
        const stream = fs.createWriteStream(toPath, { encoding: 'utf8' });
        stream.once('open', () => {
          stream.write(data, writeErr => {
            if (writeErr) {
              return res.status(500).send(err);
            }
            stream.close();
            console.log(
              `File ${
                fs.existsSync(toPath) ? 'exists' : 'does NOT exist'
              } under ${toPath}.`
            );
            if (fs.existsSync(toPath)) {
              console.log(`Content of ${toPath}:`);
              const fileData = fs.readFileSync(toPath);
              const records = parse(fileData, {
                skip_empty_lines: true
              });
              /* const workSheetsFromFile = xlsx.parse(fs.readFileSync(toPath)); */
              const result = csvToTimetable(records);
              console.log(JSON.stringify(result));
              return res.json(result);
            }
            return res.status(500).json({ msg: 'error' });
          });
        });
      });
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
  '/get-slots-to-alternate',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let query = {};
    query.staff = req.query.staff;
    query.day = {};
    query.day['$in'] = req.query.dayRange;
    Timetable.find(query)
      .sort({ day: 1, hour: 1 })
      .populate({ path: 'class', select: 'classCode nameOfClass' })
      .populate({ path: 'course', select: 'courseCode' })
      .populate({ path: 'staff', select: 'staffId name' })
      .lean()
      .then(slots => {
        if (!slots) {
          return res.json({});
        } else {
          res.json(slots);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET   api/timetable/get-staff
// @desc    Gets all staff
// @access  Private
router.get(
  '/get-staff',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    User.find({ accountType: 2 })
      .lean()
      .then(users => {
        if (!users) {
          errors.msg = 'No staff found';
          return res.status(404).json();
        } else {
          let newUsers = users.map((item, index) => {
            return {
              _id: item._id,
              staffId: item.staffId,
              name: item.name,
              designation: item.designation,
              category: item.category,
              email: item.email,
              staffType: item.staffType
            };
          });
          res.json(newUsers);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
