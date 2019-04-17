import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { setAuthToken, isEmpty } from '../utils';
import { setLoginAttempts, setCurrentUser } from './';
import { GET_ERRORS, CLEAR_ERRORS } from '../actionTypes';

//Login user - get user token
const loginUser = (userData, history, destination = '') => dispatch => {
  axios
    .post('api/account/login', userData)
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

export default loginUser;
