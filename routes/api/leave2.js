const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const shortid = require('shortid');

//load model
const Class = require('../../models/Class');
const User = require('../../models/User');
const Timetable = require('../../models/TestTimetable');
const Leave = require('../../models/Leave');

const validateAddLeaveInput = require('../../validation/addLeave');

router.get(
  '/get-leaves',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      Leave.find({})
        .then(result => {
          return res.status(200).json(result);
        })
        .catch(err => console.log(err));
    } else {
      Leave.find({ staffId: req.user.staffId }).then(result => {
        return res.status(200).json(result);
      });
    }
  }
);

// @route   POST   api/leaves/add-leave
// @desc    New Leave application
// @access  Private
router.post(
  '/add-leave',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAddLeaveInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const leave = new Leave({
      leaveId: shortid.generate(),
      staffId: req.body.staffId,
      applyDate: new Date(),
      from: req.body.from,
      to: req.body.to,
      leaveType: req.body.leaveType,
      noOfDays: req.body.noOfDays,
      reason: req.body.reason,
      isVacation: req.body.isVacation,
      address: req.body.address
    });
    leave
      .save()
      .then(data => res.json(data))
      .catch(err => console.log(err));
  }
);

module.exports = router;
