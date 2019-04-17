import axios from 'axios';

const getTimetable = classId => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/timetable/get', {
        params: {
          classId
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(false);
      });
  });
};

export default getTimetable;
