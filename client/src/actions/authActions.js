import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/add-account', userData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Login user - get user token
export const loginUser = userData => dispatch => {
  axios
    .post('api/users/login', userData)
    .then(res => {
      //Save to local storage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get userdata
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
      dispatch({ type: CLEAR_ERRORS, payload: {} });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
