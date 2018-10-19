import {
  LOGOUT_SHOWMODAL,
  LOGOUT_HIDEMODAL,
  THEME_CHANGE
} from '../actions/types';

const initialState = {
  isLogoutModalVisible: false,
  isDarkTheme: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_SHOWMODAL: {
      return {
        ...state,
        isLogoutModalVisible: true
      };
    }
    case LOGOUT_HIDEMODAL: {
      return {
        ...state,
        isLogoutModalVisible: false
      };
    }
    case THEME_CHANGE: {
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme
      };
    }
    default:
      return state;
  }
};

export default reducer;
