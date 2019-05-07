import axios from 'axios';
import { GET_ERRORS } from '../actionTypes';
import { isEmpty } from '../utils';

const addLeave = data => dispatch => {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'slotsToAlternate' || key === 'dayRange') {
        form.append(key, JSON.stringify(data[key]));
      } else {
        form.append(key, data[key]);
      }
    });
    axios
      .post('/api/leave/add', form)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        if (!isEmpty(err.response))
          return dispatch({ type: GET_ERRORS, payload: err.response.data });
        reject(false);
      });
  });
};

export default addLeave;
