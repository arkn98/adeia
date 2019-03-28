import axios from 'axios';
import { GET_STAFF } from '../actionTypes';
//import { setStaffLoading } from '.';

// retrieve all staff
const getAllStaff = () => dispatch => {
  /* dispatch(setStaffLoading()); */
  return new Promise((resolve, reject) => {
    axios
      .get('/api/timetable/get-staff')
      .then(res => {
        dispatch({
          type: GET_STAFF,
          payload: res.data
        });
        resolve(true);
      })
      .catch(err => {
        dispatch({
          type: GET_STAFF,
          payload: {}
        });
        reject(false);
      });
  });
};

export default getAllStaff;
