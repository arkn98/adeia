import axios from 'axios';
import { GET_COURSES } from '../actionTypes';
import { setCoursesLoading } from '.';

// retrieve all courses
const getAllCourses = () => dispatch => {
  dispatch(setCoursesLoading());
  return axios
    .get('/api/timetable/get-courses')
    .then(res =>
      dispatch({
        type: GET_COURSES,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_COURSES,
        payload: {}
      });
    });
};

export default getAllCourses;
