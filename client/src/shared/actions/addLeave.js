import axios from 'axios';
import { GET_ERRORS } from '../actionTypes';
import { isEmpty } from '../utils';

const addLeave = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/leave/add', data)
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
