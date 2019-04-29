import { GET_CLASS_GROUPS } from '../actionTypes';

const initialState = {
  classGroupList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASS_GROUPS:
      return {
        ...state,
        classGroupList: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
