import axios from 'axios';
import { CLEAR_ERRORS, GET_ERRORS } from '../actionTypes';

// create password reset request & send token via email
const sendResetEmail = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/account/reset-password-request', data)
      .then(res => {
        dispatch({ type: CLEAR_ERRORS, payload: {} });
        resolve(true);
      })
      .catch(err => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
        reject(false);
      });
  });
};

export default sendResetEmail;
