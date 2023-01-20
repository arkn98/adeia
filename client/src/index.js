import React from 'react';
import ReactDOM from 'react-dom';
//import registerServiceWorker from './registerServiceWorker';
import './reset.css';
import './fonts.css';
import './index.css';
import './common.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './shared/store';
import App from './screens/App';
import { checkIfLoggedIn } from './screens/App/shared/utils';
import { setCurrentTheme } from './shared/actions';

const checkThemeFromLocalStorage = () => {
  let prefs = localStorage.getItem('themePreferences');
  let isDarkTheme = false;
  if (prefs !== null) {
    isDarkTheme = prefs !== 'light';
  } else {
    isDarkTheme = false;
  }
  store.dispatch(setCurrentTheme(isDarkTheme));
};

checkIfLoggedIn();
checkThemeFromLocalStorage();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
/* registerServiceWorker(); */
