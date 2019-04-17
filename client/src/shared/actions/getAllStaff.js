import axios from 'axios';
import { GET_STAFF } from '../actionTypes';

// retrieve all staff
const getAllStaff = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/staff/get-all')
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
          payload: []
        });
        reject(false);
      });
  });
};

export default getAllStaff;
