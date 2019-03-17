import axios from 'axios';
import { GET_CLASSES } from '../actionTypes';
import { setClassesLoading } from '.';

// retrieves all classes
const getAllClasses = () => dispatch => {
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

export default getAllClasses;
