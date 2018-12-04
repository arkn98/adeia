import axios from 'axios';
import { GET_CLASSES, CLASSES_LOADING } from './types';

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

//profile loading
export const setClassesLoading = () => {
  return {
    type: CLASSES_LOADING
  };
};
