const { validationResult } = require('express-validator/check');
const mongoose = require('mongoose');

const Timetable = require('../../../models/Timetable');

const addUpdateTimetable = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  let { timetable } = req.body;
  if (!Array.isArray(timetable)) {
    errors.timetable = 'Invalid timetable';
    return res.status(400).json(errors);
  }
  let toAdd = [];
  timetable.forEach((day, dayIndex) => {
    day.forEach((hour, hourIndex) => {
      hour.course.forEach((tempCourseObj, courseIndex) => {
        toAdd.push({
          class: req.body.classId,
          classGroup: req.body.classGroupId,
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
              classGroup: req.body.classGroupId,
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
            classGroup: req.body.classGroupId,
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
  let session = null;
  mongoose.startSession().then(_session => {
    session = _session;
    session.startTransaction();
    let bulkOps = [];
    bulkOps.push({
      deleteMany: {
        filter: { class: req.body.classId }
      }
    });
    toAdd.forEach(item => {
      bulkOps.push({
        insertOne: {
          document: item
        }
      });
    });
    Timetable.bulkWrite(bulkOps, { ordered: true, session })
      .then(() => {
        session.commitTransaction();
        res.json('success');
      })
      .catch(err => {
        session.abortTransaction();
        console.log(err);
      });
  });
};

module.exports = addUpdateTimetable;
