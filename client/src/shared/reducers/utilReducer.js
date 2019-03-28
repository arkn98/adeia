import {
  THEME_CHANGE,
  SET_CURRENT_THEME,
  SET_CURRENT_PAGE_TITLE
} from '../actionTypes';

const initialState = {
  isDarkTheme: false,
  currentPageTitle: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default reducer;
