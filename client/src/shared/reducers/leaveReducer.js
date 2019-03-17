import { GET_LEAVES } from '../actionTypes';

const initialState = {
  leaveList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEAVES:
      return { ...state, leaveList: action.payload };
    default:
      return state;
  }
};

export default reducer;
