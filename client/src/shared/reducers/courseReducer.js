import { GET_COURSES } from '../actionTypes';

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
    default:
      return state;
  }
};

export default reducer;
