import { LEAVE_LOADING, GET_SLOTS_TO_ALTERNATE } from '../actions/types';

const initialState = {
  toAlternate: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LEAVE_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_SLOTS_TO_ALTERNATE: {
      return {
        ...state,
        toAlternate: action.payload,
        loading: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
