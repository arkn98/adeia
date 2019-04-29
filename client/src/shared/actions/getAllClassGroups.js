import axios from 'axios';
import { GET_CLASS_GROUPS } from '../actionTypes';

// retrieves all classes
const getAllClassGroups = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/class-group/get-all')
      .then(res => {
        dispatch({
          type: GET_CLASS_GROUPS,
          payload: res.data
        });
        resolve(true);
      })
      .catch(err => {
        dispatch({
          type: GET_CLASS_GROUPS,
          payload: []
        });
        reject(false);
      });
  });
};

export default getAllClassGroups;
