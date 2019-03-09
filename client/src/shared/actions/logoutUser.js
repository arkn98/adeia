import { setAuthToken } from '../utils';
import { setCurrentUser } from './';

//logout user
const logoutUser = () => dispatch => {
  //remove token from localstorage
  localStorage.removeItem('jwtToken');
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to empty object and set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export default logoutUser;
