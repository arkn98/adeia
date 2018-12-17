import {
  LOGOUT_SHOWMODAL,
  LOGOUT_HIDEMODAL,
  THEME_CHANGE,
  SET_CURRENT_THEME,
  SET_CURRENT_PAGE_TITLE,
  INFO_HIDEMODAL,
  INFO_SHOWMODAL
} from '../actions/types';

const initialState = {
  isInfoModalVisible: false,
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
    case SET_CURRENT_PAGE_TITLE: {
      return {
        ...state,
        currentPageTitle: action.payload
      };
    }
    case INFO_HIDEMODAL: {
      return {
        ...state,
        isInfoModalVisible: false
      };
    }
    case INFO_SHOWMODAL: {
      return {
        ...state,
        isInfoModalVisible: true
      };
    }
    default:
      return state;
  }
};

export default reducer;
