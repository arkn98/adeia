import {
  LOGOUT_SHOWMODAL,
  LOGOUT_HIDEMODAL,
  THEME_CHANGE,
  SET_CURRENT_THEME
} from './types';

export const changeTheme = data => dispatch => {
  let isDarkTheme;
  if (data === true) isDarkTheme = 'light';
  else isDarkTheme = 'dark';
  localStorage.setItem('themePreferences', isDarkTheme);
  dispatch({ type: THEME_CHANGE });
};

export const setCurrentTheme = data => {
  return {
    type: SET_CURRENT_THEME,
    payload: data
  };
};

export const showLogoutPopup = () => {
  return {
    type: LOGOUT_SHOWMODAL
  };
};

export const hideLogoutPopup = () => {
  return {
    type: LOGOUT_HIDEMODAL
  };
};
