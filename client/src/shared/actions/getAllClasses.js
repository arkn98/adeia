import axios from 'axios';
import { GET_CLASSES } from '../actionTypes';

// retrieves all classes
const getAllClasses = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/admin/get-classes')
      .then(res => {
        dispatch({
          type: GET_CLASSES,
          payload: res.data
        });
        resolve(true);
      })
      .catch(err => {
        dispatch({
          type: GET_CLASSES,
          payload: []
        });
        reject(err);
      });
  });
};

export default getAllClasses;
