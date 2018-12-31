import {
  GET_CLASSES,
  CLASSES_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from '../actions/types';

const initialState = {
  classList: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASSES: {
      return {
        ...state,
        classList: action.payload,
        loading: false
      };
    }
    case CLASSES_LOADING: {
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
