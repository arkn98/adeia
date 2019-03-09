import axios from 'axios';
import * as moment from 'moment';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  SET_LOGIN_ATTEMPT_DETAILS
} from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import isEmpty from '../validation/is-empty';

moment().locale();

// clear all errors set due to some event
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS, payload: {} });
};

// Register account (admin/office)
export const registerUser = (userData, profileData, history) => dispatch => {
  axios
    .post('/api/users/add-account', userData)
    .then(res => {
      axios
        .post('/api/profile', profileData)
        .then(res => {
          dispatch({ type: CLEAR_ERRORS, payload: {} });
          history.push('/dashboard');
        })
        .catch(err =>
          dispatch({ type: GET_ERRORS, payload: err.response.data })
        );
    })
    .catch(err => {
      if (!isEmpty(err.response))
        return dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

// parse UA of client & add corresponding success/failure entry in their profile
export const setLoginAttempts = (email, status) => dispatch => {
  axios
    .get('/api/users/getclientdetails')
    .then(res => {
      if (res.data) {
        let newObj = {
          email: email,
          attemptStatus: status,
          timestamp: moment().unix(),
          ip: res.data.ip,
          browser: res.data.browser,
          browserVersion: res.data.browserVersion,
          os: res.data.os,
          osVersion: res.data.osVersion
        };
        axios
          .post('/api/users/set-login-attempts', newObj)
          .then(data => {
            dispatch({ type: SET_LOGIN_ATTEMPT_DETAILS });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

//register staff
export const registerStaff = (userData, profileData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      axios
        .post('/api/profile', profileData)
        .then(res => {
          dispatch({ type: CLEAR_ERRORS, payload: {} });
          history.push('/dashboard');
        })
        .catch(err =>
          dispatch({ type: GET_ERRORS, payload: err.response.data })
        );
    })
    .catch(err => {
      if (!isEmpty(err.response))
        return dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//Login user - get user token
export const loginUser = (userData, history, destination = '') => dispatch => {
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
      dispatch(setLoginAttempts(userData.email, true));
      dispatch(setCurrentUser(decoded));
      dispatch({ type: CLEAR_ERRORS, payload: {} });
      history.push(destination !== '' ? destination : '/dashboard');
    })
    .catch(err => {
      if (!isEmpty(err.response)) {
        dispatch(setLoginAttempts(userData.email, false));
        return dispatch({ type: GET_ERRORS, payload: err.response.data });
      }
    });
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//logout user
export const logoutUser = () => dispatch => {
  //remove token from localstorage
  localStorage.removeItem('jwtToken');
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to empty object and set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Activate user
export const activateUser = (userData, profileData, history) => dispatch => {
  axios
    .post('/api/users/activate', userData)
    .then(res => {
      history.push('/login');
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// create password reset request & send token via email
export const sendResetEmail = data => dispatch => {
  axios
    .post('/api/users/reset-password-request', data)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS, payload: {} });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// reset password
export const resetPassword = (data, history) => dispatch => {
  axios
    .post('/api/users/reset-password', data)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS, payload: {} });
      history.push('/login');
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// clear password reset token (usually done when user logs in; or actually uses the reset token)
export const clearResetToken = (data, history) => dispatch => {
  axios
    .put('api/users/clear-reset-token', data)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
