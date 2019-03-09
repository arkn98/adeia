import {
  GET_COURSES,
  COURSES_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from '../actions/types';

const initialState = {
  courseList: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSES: {
      return {
        ...state,
        courseList: action.payload,
        loading: false
      };
    }
    case COURSES_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
