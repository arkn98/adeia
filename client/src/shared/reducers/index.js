import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import utilReducer from './utilReducer';
import profileReducer from './profileReducer';
/*
import timetableReducer from './timetableReducer';
import classReducer from './classReducer';
import courseReducer from './courseReducer';
import staffReducer from './staffReducer';
import leaveReducer from './leaveReducer'; */

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  utils: utilReducer,
  profile: profileReducer
  /*
  timetable: timetableReducer,
  classes: classReducer,
  courses: courseReducer,
  staff: staffReducer,
  leave: leaveReducer */
});
