import React from 'react';
import axios from 'axios';

const clickHandler = event => {
  event.preventDefault();
  let newTimetable = {
    timetable: {
      day01: {
        h01: {
          courseCode: '',
          handlingStaffId: '',
          additionalStaffId: []
        },
        h02: {
          courseCode: '',
          handlingStaffId: '',
          additionalStaffId: []
        },
        h03: {
          courseCode: '',
          handlingStaffId: '',
          additionalStaffId: []
        },
        h04: {
          courseCode: '',
          handlingStaffId: '',
          additionalStaffId: []
        },
        h05: {
          courseCode: '',
          handlingStaffId: '',
          additionalStaffId: []
        },
        h06: {
          courseCode: '',
          handlingStaffId: '',
          additionalStaffId: []
        },
        h07: {
          courseCode: '',
          handlingStaffId: '',
          additionalStaffId: []
        },
        h08: {
          courseCode: '',
          handlingStaffId: '',
          additionalStaffId: []
        }
      }
    }
  };
  newTimetable.classCode = 'BT3G';
  for (let i = 1; i <= 1; i++) {
    for (let j = 1; j <= 8; j++) {
      newTimetable.timetable['day0' + i]['h0' + j].courseCode = 'CA7001';
      newTimetable.timetable['day0' + i]['h0' + j].handlingStaffId = '12345';
      newTimetable.timetable['day0' + i]['h0' + j].additionalStaffId.push(
        '12345'
      );
    }
  }

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
