import { GET_CLASSES } from '../actionTypes';

const initialState = {
  classList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASSES:
      return {
        ...state,
        classList: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
