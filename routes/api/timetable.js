const express = require('express');
const router = express.Router();
const passport = require('passport');

//load model
const Class = require('../../models/Class');
const Course = require('../../models/Course');
const User = require('../../models/User');
const Timetable = require('../../models/Timetable');

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
      const { errors, isValid } = validateAddTimetableInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      Timetable.findOne({ classCode: req.body.classCode })
        .then(timetable => {
          if (timetable) {
            errors.msg = 'Timetable already exists';
            return res.status(400).json(errors);
          } else {
            Class.findOne({ classCode: req.body.classCode })
              .then(myClass => {
                if (myClass) {
                  let obj = [];
                  req.body.timetable.map((day, index) => {
                    let dayarr = [];
                    day.map((hour, index2) => {
                      let hourobj = {
                        courseCode: hour.courseCode,
                        handlingStaff: undefined,
                        additionalStaff: []
                      };
                      User.findOne({ staffId: hour.handlingStaffId })
                        .then(user => {
                          if (user) {
                            hourobj.handlingStaff = user.id;
                            if (
                              typeof hour.additionalStaffId !== 'undefined' &&
                              hour.additionalStaffId.length > 0
                            ) {
                              hour.additionalStaffId.map(id => {
                                User.findOne({ staffId: id })
                                  .then(addStaff => {
                                    //console.log(id);
                                    if (addStaff)
                                      hourobj.additionalStaff.push(addStaff.id);
                                  })
                                  .catch();
                              });
                            }
                          }
                        })
                        .catch();
                      dayarr.push(hourobj);
                    });
                    obj.push(dayarr);
                  });

                  console.log(obj);

                  let newTimetable = new Timetable({
                    classCode: req.body.classCode,
                    class: myClass.id,
                    timetable: obj
                  });

                  //console.log(newTimetable);

                  newTimetable
                    .save()
                    .then(timetable => res.json(timetable))
                    .catch(err => console.log(err));
                } else {
                  errors.msg = 'Class not found';
                  return res.status(400).json(errors);
                }
              })
              .catch();
          }
        })
        .catch();
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

router.post(
  '/get-timetable',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const errors = {};
      Timetable.findOne({ classCode: req.body.classCode })
        .then(timetable => {
          if (timetable) {
            res.json(timetable);
          } else {
            errors.msg = 'Timetable not found';
            res.status(404).json(errors);
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
            errors.noclass = 'No class found';
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

module.exports = router;
