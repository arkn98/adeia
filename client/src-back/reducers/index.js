import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import utilReducer from './utilReducer';
import timetableReducer from './timetableReducer';
import classReducer from './classReducer';
import courseReducer from './courseReducer';
import staffReducer from './staffReducer';
import leaveReducer from './leaveReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  utils: utilReducer,
  timetable: timetableReducer,
  classes: classReducer,
  courses: courseReducer,
  staff: staffReducer,
  leave: leaveReducer
});
