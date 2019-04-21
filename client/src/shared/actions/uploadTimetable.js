import axios from 'axios';

const uploadTimetable = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/timetable/upload', data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject(false);
      });
  });
};

export default uploadTimetable;
