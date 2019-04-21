import { GET_STAFF } from '../actionTypes';

const initialState = {
  staffList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STAFF:
      return {
        ...state,
        staffList: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
