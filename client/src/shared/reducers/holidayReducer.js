import { GET_HOLIDAYS } from '../actionTypes';

const initialState = {
  holidayList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOLIDAYS: {
      return {
        ...state,
        holidayList: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
