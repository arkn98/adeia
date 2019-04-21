import { GET_LEAVETYPES } from '../actionTypes';

const initialState = {
  leaveTypeList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEAVETYPES:
      return {
        ...state,
        leaveTypeList: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
