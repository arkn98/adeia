import axios from 'axios';
import { GET_ERRORS } from '../actionTypes';
import { isEmpty } from '../utils';

const addLeave = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/leaves/add-leave', data)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        if (!isEmpty(err.response))
          return dispatch({ type: GET_ERRORS, payload: err.response.data });
        reject(err);
      });
  });
};

export default addLeave;
