import { GET_CLASSES, CLASSES_LOADING, CLEAR_CLASSES } from '../actions/types';

const initialState = {
  classes: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASSES_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_CLASSES: {
      return {
        ...state,
        classes: action.payload,
        loading: false
      };
    }
    case CLEAR_CLASSES: {
      return {
        ...state,
        classes: null
      };
    }
    default:
      return state;
  }
};

export default reducer;
