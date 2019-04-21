import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from 'shared/utils';
import store from 'shared/store';
import {
  setCurrentUser,
  logoutUser,
  clearCurrentProfile
} from 'shared/actions';

//check for user token
const checkIfLoggedIn = () => {
  if (localStorage.jwtToken) {
    //set auth token header
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    //setting user
    store.dispatch(setCurrentUser(decoded));

    let pwdResetTime;
    axios
      .get('/api/account/get-password-reset-time', {
        params: {
          staffId: decoded.staffId
        }
      })
      .then(res => {
        pwdResetTime = res.data.pwdResetTime;
        pwdResetTime = pwdResetTime !== -1 ? pwdResetTime / 1000 : -1;
        //check for expired token
        const currentTime = Date.now() / 1000;
        if (
          decoded.exp < currentTime ||
          (pwdResetTime !== -1 && decoded.iat < pwdResetTime)
        ) {
          //logout user
          store.dispatch(logoutUser());
          //clear current profile
          store.dispatch(clearCurrentProfile());
          //redirect to login
          window.location.href = '/login';
        }
      })
      .catch(err => console.log(err));
  }
};

export default checkIfLoggedIn;
