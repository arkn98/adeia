import { GET_PROFILE, CLEAR_CURRENT_PROFILE } from '../actionTypes';

const initialState = {
  profile: {},
  isLoaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
        isLoaded: true
      };
    }
    case CLEAR_CURRENT_PROFILE: {
      return {
        ...state,
        profile: {},
        isLoaded: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
