import axios from 'axios';
import { CLEAR_ERRORS, GET_ERRORS } from '../actionTypes';
import { logoutUser } from '.';

// reset password
const resetPassword = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/account/reset-password', data)
      .then(res => {
        dispatch({ type: CLEAR_ERRORS, payload: {} });
        dispatch(logoutUser());
        resolve(true);
      })
      .catch(err => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
        reject(false);
      });
  });
};

export default resetPassword;
