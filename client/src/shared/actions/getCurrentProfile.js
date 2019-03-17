import axios from 'axios';
import { setProfileLoading } from './';
import { GET_PROFILE } from '../actionTypes';

// Get current profile
const getCurrentProfile = (shouldSetProfileLoading = true) => dispatch => {
  if (shouldSetProfileLoading) dispatch(setProfileLoading());
  return axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

export default getCurrentProfile;
