import axios from 'axios';

const uploadTimetable = data => dispatch => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  return new Promise((resolve, reject) => {
    axios
      .post('/api/timetable/upload', data, config)
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
