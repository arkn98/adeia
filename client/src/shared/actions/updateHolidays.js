import axios from 'axios';
import { CLEAR_ERRORS, GET_ERRORS } from '../actionTypes';

const updateHolidays = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .patch('/api/holiday/edit', data)
      .then(res => {
        dispatch({ type: CLEAR_ERRORS, payload: {} });
        resolve(true);
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_ERRORS, payload: err.response.data });
        reject(err);
      });
  });
};

export default updateHolidays;
