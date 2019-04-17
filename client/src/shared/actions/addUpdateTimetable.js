import axios from 'axios';

const addUpdateTimetable = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/timetable/add', data)
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(false);
      });
  });
};

export default addUpdateTimetable;
