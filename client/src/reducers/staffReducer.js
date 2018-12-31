import {
  GET_STAFF,
  STAFF_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from '../actions/types';

const initialState = {
  staffList: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STAFF: {
      return {
        ...state,
        staffList: action.payload,
        loading: false
      };
    }
    case STAFF_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
