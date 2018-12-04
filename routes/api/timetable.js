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
      //check validation
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
                  let newTimetable = new Timetable({
                    class: myClass.id,
                    classCode: req.body.classCode
                  });
                  for (let i = 1; i <= 1; i++) {
                    for (let j = 1; j <= 8; j++) {
                      if (
                        req.body.timetable['day0' + i]['h0' + j].courseCode !==
                        ''
                      ) {
                        newTimetable.timetable['day0' + i][
                          'h0' + j
                        ].courseCode =
                          req.body.timetable['day0' + i]['h0' + j].courseCode;
                        User.findOne({
                          staffId:
                            req.body.timetable['day0' + i]['h0' + j]
                              .handlingStaffId
                        }).then(staff => {
                          if (staff) {
                            newTimetable.timetable['day0' + i][
                              'h0' + j
                            ].handlingStaff = staff.id;
                            let tempString = 'timetable.day0' + i + '.h0' + j;
                            newTimetable.markModified(tempString);
                            req.body.timetable['day0' + i][
                              'h0' + j
                            ].additionalStaffId.map(staffId => {
                              User.findOne({ staffId: staffId }).then(staff => {
                                if (staff) {
                                  newTimetable.timetable['day0' + i][
                                    'h0' + j
                                  ].additionalStaff.push(staff.id);
                                }
                              });
                            });
                          }
                        });
                      }
                    }
                  }
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
