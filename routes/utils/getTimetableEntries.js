const Timetable = require('../../models/Timetable');

const getTimetableDayEntries = (classId, day) => {
  return new Promise(resolve => {
    Timetable.find({ class: classId, day })
      .sort({ day: 1, hour: 1 })
      .populate({ path: 'class', select: 'classCode' })
      .populate({ path: 'course', select: 'courseCode' })
      .populate({ path: 'staff', select: 'staffId name' })
      .then(timetable => {
        if (timetable && timetable.length !== 0) {
          let newTimetable = new Array();
          timetable.forEach(hour => {
            //check if hour already exists in newTimetable
            let index = newTimetable.findIndex(
              x => x.start === hour.hour && x.duration === hour.duration
            );
            if (index === -1) {
              let newHour = {
                start: hour.hour,
                duration: hour.duration,
                course: []
              };
              let courseObj = {
                courseCode: hour.course.courseCode,
                handlingStaff: hour.staff.staffId,
                additionalStaff: []
              };
              newHour.course.push(courseObj);
              newTimetable.push(newHour);
            } else {
              let isCourseFound = newTimetable[index].course.findIndex(
                x => x.courseCode === hour.course.courseCode
              );
              if (isCourseFound === -1) {
                if (hour.staffRole === 'MAIN') {
                  let courseObj = {
                    courseCode: hour.course.courseCode,
                    handlingStaff: hour.staff.staffId,
                    additionalStaff: []
                  };
                  newTimetable[index].course.push(courseObj);
                } else {
                  let courseObj = {
                    courseCode: hour.course.courseCode,
                    handlingStaff: '',
                    additionalStaff: []
                  };
                  courseObj.additionalStaff.push(hour.staff.staffId);
                  newTimetable[index].course.push(courseObj);
                }
              } else {
                if (hour.staffRole === 'MAIN') {
                  newTimetable[index].course[isCourseFound].handlingStaff =
                    hour.staff.staffId;
                } else {
                  newTimetable[index].course[
                    isCourseFound
                  ].additionalStaff.push(hour.staff.staffId);
                }
              }
            }
          });
          return resolve(newTimetable);
        } else {
          return resolve([]);
        }
      })
      .catch(err => {
        return resolve([]);
      });
  });
};

const getTimetableEntries = async classId => {
  let result = [];
  for (let i = 1; i <= 5; i++) {
    let timetable = await getTimetableDayEntries(classId, i);
    result.push(timetable);
  }
  return result;
};

module.exports = { getTimetableDayEntries, getTimetableEntries };
