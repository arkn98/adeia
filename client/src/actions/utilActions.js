import {
  LOGOUT_SHOWMODAL,
  LOGOUT_HIDEMODAL,
  THEME_CHANGE,
  SET_CURRENT_THEME,
  SET_CURRENT_PAGE_TITLE,
  INFO_SHOWMODAL,
  INFO_HIDEMODAL
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

export const updateCurrentRouteTitle = data => {
  return {
    type: SET_CURRENT_PAGE_TITLE,
    payload: data
  };
};

export const showInfoPopup = () => {
  return {
    type: INFO_SHOWMODAL
  };
};

export const hideInfoPopup = () => {
  return {
    type: INFO_HIDEMODAL
  };
};
