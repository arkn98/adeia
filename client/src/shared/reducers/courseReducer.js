import { GET_COURSES } from '../actionTypes';

const initialState = {
  courseList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSES: {
      return {
        ...state,
        courseList: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
