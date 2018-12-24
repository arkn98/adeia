import React from 'react';
import axios from 'axios';

const clickHandler = event => {
  event.preventDefault();
  /* let newTimetable = {
    timetable: {
      day01: {
        h01: {
          courseCode: null,
          handlingStaffId: null,
          additionalStaffId: []
        },
        h02: {
          courseCode: null,
          handlingStaffId: null,
          additionalStaffId: []
        },
        h03: {
          courseCode: null,
          handlingStaffId: null,
          additionalStaffId: []
        },
        h04: {
          courseCode: null,
          handlingStaffId: null,
          additionalStaffId: []
        },
        h05: {
          courseCode: null,
          handlingStaffId: null,
          additionalStaffId: []
        },
        h06: {
          courseCode: null,
          handlingStaffId: null,
          additionalStaffId: []
        },
        h07: {
          courseCode: null,
          handlingStaffId: null,
          additionalStaffId: []
        },
        h08: {
          courseCode: null,
          handlingStaffId: null,
          additionalStaffId: []
        }
      }
    }
  }; */
  let newTimetable = {};
  newTimetable.classCode = 'BT3G';
  let day = [];
  for (let i = 1; i <= 5; i++) {
    let today = [];
    for (let j = 1; j <= 8; j++) {
      let hour = {};
      hour.courseCode = 'CA7001';
      hour.handlingStaffId = '12345';
      hour.additionalStaffId = [];
      hour.additionalStaffId.push('12345');
      today.push(hour);
    }
    day.push(today);
  }

  newTimetable.timetable = day;

  console.log(newTimetable);
  axios
    .post('/api/timetable/add-timetable', newTimetable)
    .then(timetable => console.log(timetable))
    .catch(err => console.log(err));
};

const temp = props => {
  return (
    <div onClick={clickHandler} style={{ cursor: 'pointer' }}>
      click me
    </div>
  );
};

export default temp;
