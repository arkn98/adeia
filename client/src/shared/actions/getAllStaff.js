import axios from 'axios';
import { GET_STAFF } from '../actionTypes';
import { setStaffLoading } from '.';

// retrieve all staff
const getAllStaff = () => dispatch => {
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

export default getAllStaff;
