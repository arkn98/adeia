import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  /* GET_ERRORS ,*/
  CLEAR_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = (
  shouldSetProfileLoading = true
) => dispatch => {
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

// Create Profile
export const createProfile = profileData => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => dispatch({ type: CLEAR_ERRORS, payload: {} }));
};

//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
