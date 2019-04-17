import axios from 'axios';
import { GET_COURSES } from '../actionTypes';

// retrieve all courses
const getAllCourses = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/course/get-all')
      .then(res => {
        dispatch({
          type: GET_COURSES,
          payload: res.data
        });
        resolve(true);
      })
      .catch(err => {
        dispatch({
          type: GET_COURSES,
          payload: []
        });
        reject(false);
      });
  });
};

export default getAllCourses;
