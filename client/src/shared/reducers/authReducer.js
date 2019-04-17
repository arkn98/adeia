import { SET_CURRENT_USER, SET_CURRENT_USER_MERGE } from '../actionTypes';
import { isEmpty } from '../utils';

const initialState = {
  isAuthenticated: false,
  isLoaded: false,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        isLoaded: 'email' in action.payload
      };
    case SET_CURRENT_USER_MERGE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isLoaded: true
      };
    default:
      return state;
  }
};

export default reducer;
