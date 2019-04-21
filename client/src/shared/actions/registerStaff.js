import axios from 'axios';
import { CLEAR_ERRORS, GET_ERRORS } from '../actionTypes';
import { isEmpty } from '../utils';

const registerStaff = (userData, profileData) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/account/add-staff', userData)
      .then(res => {
        axios
          .post('/api/profile/add', profileData)
          .then(res => {
            dispatch({ type: CLEAR_ERRORS, payload: {} });
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            dispatch({ type: GET_ERRORS, payload: err.response.data });
            reject(false);
          });
      })
      .catch(err => {
        if (!isEmpty(err.response)) {
          dispatch({ type: GET_ERRORS, payload: err.response.data });
          reject(false);
        }
      });
  });
};

export default registerStaff;
