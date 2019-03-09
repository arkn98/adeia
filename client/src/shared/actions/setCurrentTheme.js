import { SET_CURRENT_THEME } from '../actionTypes';

const setCurrentTheme = data => {
  return {
    type: SET_CURRENT_THEME,
    payload: data
  };
};

export default setCurrentTheme;
