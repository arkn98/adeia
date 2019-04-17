import axios from 'axios';
import { SET_CURRENT_USER_MERGE } from '../actionTypes';

const getCurrentUser = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/account/get-current', {
        params: {
          id
        }
      })
      .then(res => {
        dispatch({ type: SET_CURRENT_USER_MERGE, payload: res.data.user });
        resolve(true);
      })
      .catch(err => {
        console.log(err);
        reject(false);
      });
  });
};

export default getCurrentUser;
