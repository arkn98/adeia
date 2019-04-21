import axios from 'axios';
import { GET_LEAVEALLOCATIONS } from '../actionTypes';

const getAllLeaveAllocations = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/leave-allocation/get-all')
      .then(res => {
        dispatch({
          type: GET_LEAVEALLOCATIONS,
          payload: res.data
        });
        resolve(true);
      })
      .catch(err => {
        dispatch({
          type: GET_LEAVEALLOCATIONS,
          payload: []
        });
        reject(false);
      });
  });
};

export default getAllLeaveAllocations;
