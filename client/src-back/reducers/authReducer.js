import { SET_CURRENT_USER, SET_LOGIN_ATTEMPT_DETAILS } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_ATTEMPT_DETAILS:
      return { ...state };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
