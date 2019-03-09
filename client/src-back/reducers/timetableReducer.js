import {
  GET_TIMETABLE,
  TIMETABLE_LOADING,
  CLEAR_TIMETABLE
} from '../actions/types';

const initialState = {
  timetable: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TIMETABLE_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_TIMETABLE: {
      return {
        ...state,
        timetable: action.payload,
        loading: false
      };
    }
    case CLEAR_TIMETABLE: {
      return {
        ...state,
        timetable: null
      };
    }
    default:
      return state;
  }
};

export default reducer;
