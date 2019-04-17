const { validationResult } = require('express-validator/check');
const { deleteExistingEntries } = require('../../utils');

const addUpdateTimetable = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

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
          return res.json({ msg: 'added' });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

module.exports = addUpdateTimetable;
