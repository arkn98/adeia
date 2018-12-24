import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { setCurrentTheme } from './actions/utilActions';
//import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { clearCurrentProfile } from './actions/profileActions';

//check for user token
if (localStorage.jwtToken) {
  //set auth token header
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  //setting user
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //clear current profile
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = '/';
  }
}

let isDarkTheme = false;

if (localStorage.themePreferences) {
  if (localStorage.themePreferences === 'dark') {
    isDarkTheme = true;
  } else if (localStorage.themePreferences === 'light') {
    isDarkTheme = false;
  }
  store.dispatch(setCurrentTheme(isDarkTheme));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
/* registerServiceWorker(); */
