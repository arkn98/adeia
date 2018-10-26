import {
  LOGOUT_SHOWMODAL,
  LOGOUT_HIDEMODAL,
  THEME_CHANGE,
  SET_CURRENT_THEME
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
    case SET_CURRENT_THEME: {
      return {
        ...state,
        isDarkTheme: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
