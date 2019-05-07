import { GET_ALTERATIONS } from '../actionTypes';

const initialState = {
  alterationList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALTERATIONS:
      return { ...state, alterationList: action.payload };
    default:
      return state;
  }
};

export default reducer;
