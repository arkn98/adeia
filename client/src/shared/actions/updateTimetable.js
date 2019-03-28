import axios from 'axios';

const updateTimetable = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/timetable/add-timetable', data)
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(false);
      });
  });
};

export default updateTimetable;
