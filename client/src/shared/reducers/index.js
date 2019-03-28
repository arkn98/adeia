import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import utilReducer from './utilReducer';
import profileReducer from './profileReducer';
import leaveReducer from './leaveReducer';
import timetableReducer from './timetableReducer';
import classReducer from './classReducer';
import staffReducer from './staffReducer';
import courseReducer from './courseReducer';
/*
import leaveReducer from './leaveReducer'; */

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  utils: utilReducer,
  profile: profileReducer,
  leave: leaveReducer,
  timetable: timetableReducer,
  classes: classReducer,
  staff: staffReducer,
  courses: courseReducer
  /*
  timetable: timetableReducer,
  staff: staffReducer,
  */
});
