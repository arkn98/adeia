import axios from 'axios';
import { GET_ERRORS, CLEAR_ERRORS } from '../actionTypes';

const updateCourse = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .patch('/api/course/edit', data)
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

export default updateCourse;
