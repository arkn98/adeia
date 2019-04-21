const express = require('express');
const router = express.Router();
const passport = require('passport');
const moment = require('moment');

moment().local();

//load model
const Timetable = require('../../models/Timetable');

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

module.exports = router;
