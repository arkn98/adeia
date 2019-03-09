import { THEME_CHANGE } from '../actionTypes';

const changeTheme = data => dispatch => {
  let isDarkTheme;
  if (data === true) isDarkTheme = 'light';
  else isDarkTheme = 'dark';
  localStorage.setItem('themePreferences', isDarkTheme);
  dispatch({ type: THEME_CHANGE });
};

export default changeTheme;
