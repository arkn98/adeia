import axios from 'axios';

const getTimetableSlotsToAlternate = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/timetable/get-slots-to-alternate', data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject([]);
      });
  });
};

export default getTimetableSlotsToAlternate;
