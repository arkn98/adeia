import axios from 'axios';
import {
  GET_CLASSES,
  CLASSES_LOADING,
  GET_COURSES,
  COURSES_LOADING,
  STAFF_LOADING,
  GET_STAFF,
  GET_TIMETABLE,
  TIMETABLE_LOADING,
  CLEAR_TIMETABLE
} from './types';

// set timetable loading in global state
export const setTimetableLoading = () => {
  return {
    type: TIMETABLE_LOADING
  };
};

// set timetable loading in global state
export const getTimetable = classCode => dispatch => {
  dispatch(setTimetableLoading());
  axios
    .post('/api/timetable/get-timetable', classCode)
    .then(res => {
      dispatch({
        type: GET_TIMETABLE,
        payload: res.data
      });
    })
    .catch(err => {
      //console.log(err);
      dispatch({
        type: GET_TIMETABLE,
        payload: {}
      });
    });
};

// retrieves all classes
export const getAllClasses = () => dispatch => {
  dispatch(setClassesLoading());
  return axios
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
        payload: []
      });
    });
};

// set classes loading
export const setClassesLoading = () => {
  return {
    type: CLASSES_LOADING
  };
};

// retrieve all courses
export const getAllCourses = () => dispatch => {
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

// retrieve all staff
export const getAllStaff = () => dispatch => {
  dispatch(setStaffLoading());
  return axios
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

// set staff loading
export const setStaffLoading = () => {
  return {
    type: STAFF_LOADING
  };
};

// set courses loading
export const setCoursesLoading = () => {
  return {
    type: COURSES_LOADING
  };
};
