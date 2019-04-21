import { GET_LEAVEALLOCATIONS } from '../actionTypes';

const initialState = {
  leaveAllocationList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEAVEALLOCATIONS:
      return {
        ...state,
        leaveAllocationList: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
