import axios from 'axios';
import { GET_PROFILE } from '../actionTypes';

const getCurrentProfile = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/profile/')
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        });
        resolve(true);
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_PROFILE,
          payload: {}
        });
        reject(false);
      });
  });
};

export default getCurrentProfile;
