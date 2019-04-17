import axios from 'axios';
import { GET_ERRORS } from '../actionTypes';
import { isEmpty } from '../utils';

const addCourse = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/course/add', data)
      .then(res => resolve(true))
      .catch(err => {
        if (!isEmpty(err.response)) {
          dispatch({ type: GET_ERRORS, payload: err.response.data });
          reject(false);
        }
      });
  });
};

export default addCourse;
