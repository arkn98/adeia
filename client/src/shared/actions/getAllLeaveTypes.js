import axios from 'axios';
import { GET_LEAVETYPES } from '../actionTypes';

const getAllLeaveTypes = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/leave-type/get-all')
      .then(res => {
        dispatch({
          type: GET_LEAVETYPES,
          payload: res.data
        });
        resolve(true);
      })
      .catch(err => {
        dispatch({
          type: GET_LEAVETYPES,
          payload: []
        });
        reject(false);
      });
  });
};

export default getAllLeaveTypes;
