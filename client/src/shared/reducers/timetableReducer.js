import { GET_TIMETABLE } from '../actionTypes';

const initialState = {
  timetable: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMETABLE: {
      return {
        ...state,
        timetable: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
