import { LOGOUT_SHOWMODAL, LOGOUT_HIDEMODAL, THEME_CHANGE } from './types';

export const changeTheme = () => {
  return {
    type: THEME_CHANGE
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
