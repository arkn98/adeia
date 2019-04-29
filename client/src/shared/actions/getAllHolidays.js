import axios from 'axios';
import { GET_HOLIDAYS } from '../actionTypes';

const getAllHolidays = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/holiday/get-all')
      .then(res => {
        dispatch({
          type: GET_HOLIDAYS,
          payload: res.data
        });
        resolve(true);
      })
      .catch(err => {
        dispatch({
          type: GET_HOLIDAYS,
          payload: []
        });
        reject(false);
      });
  });
};

export default getAllHolidays;
