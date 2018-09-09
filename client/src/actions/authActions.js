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

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/add-account', userData)
    .then(res => history.push('/dashboard'))
    .catch(err => {
      if (!isEmpty(err.response))
        return dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
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
      //get client details from IP
      let sessionData = {};
      moment.locale();
      let now = moment().format('llll');
      console.log(now);

      sessionData.attemptStatus = 'Success';
      sessionData.timestamp = now;

      //let ipDetails;

      axios.get('/api/users/getip').then(data => {
        sessionData.ip = data.response.ip;
        console.log(data);
        console.log(sessionData);
      });

      //set current user
      dispatch(setCurrentUser(decoded));
      dispatch(setLoginAttemptDetails(sessionData));
      dispatch({ type: CLEAR_ERRORS, payload: {} });
    })
    .catch(err => {
      if (!isEmpty(err.response))
        return dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//set failed/successful login attempts
export const setLoginAttemptDetails = sessionData => {
  return {
    type: SET_LOGIN_ATTEMPT_DETAILS,
    payload: sessionData
  };
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
export const activateUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/activate', userData)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS, payload: {} });
      history.push('/login');
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
