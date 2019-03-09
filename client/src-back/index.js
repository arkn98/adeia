import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { setCurrentTheme } from './actions/utilActions';
import axios from 'axios';
//import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { clearCurrentProfile } from './actions/profileActions';
import AppContainer from './containers/AppContainer';

//check for user token
if (localStorage.jwtToken) {
  //set auth token header
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  //setting user
  store.dispatch(setCurrentUser(decoded));

  let pwdResetTime;
  axios
    .get('/api/users/get-pwd-reset-time', {
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

let isDarkTheme = false;

if (localStorage.themePreferences) {
  if (localStorage.themePreferences === 'dark') {
    isDarkTheme = true;
  } else {
    isDarkTheme = false;
  }
} else {
  isDarkTheme = false;
}
store.dispatch(setCurrentTheme(isDarkTheme));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer isDarkTheme={isDarkTheme} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
/* registerServiceWorker(); */
