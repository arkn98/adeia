import axios from 'axios';
import {
  GET_CLASSES,
  CLASSES_LOADING,
  GET_COURSES,
  COURSES_LOADING,
  STAFF_LOADING,
  GET_STAFF
} from './types';

export const getAllClasses = () => dispatch => {
  dispatch(setClassesLoading());
  axios
    .get('/api/timetable/get-classes')
    .then(res =>
      dispatch({
        type: GET_CLASSES,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_CLASSES,
        payload: {}
      });
    });
};

export const setClassesLoading = () => {
  return {
    type: CLASSES_LOADING
  };
};

export const getAllCourses = () => dispatch => {
  dispatch(setCoursesLoading());
  axios
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

export const getAllStaff = () => dispatch => {
  dispatch(setStaffLoading());
  axios
    .get('/api/timetable/get-staff')
    .then(res =>
      dispatch({
        type: GET_STAFF,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_STAFF,
        payload: {}
      });
    });
};

export const setStaffLoading = () => {
  return {
    type: STAFF_LOADING
  };
};

export const setCoursesLoading = () => {
  return {
    type: COURSES_LOADING
  };
};
