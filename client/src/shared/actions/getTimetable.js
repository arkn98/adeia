import axios from 'axios';
import { GET_TIMETABLE } from '../actionTypes';

const getTimetable = classId => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/timetable/get', {
        params: {
          classId
        }
      })
      .then(res => {
        dispatch({ type: GET_TIMETABLE, payload: res.data });
        resolve(true);
      })
      .catch(err => {
        reject(false);
      });
  });
};

export default getTimetable;
