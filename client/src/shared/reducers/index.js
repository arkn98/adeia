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
import leaveTypeReducer from './leaveTypeReducer';
import leaveAllocationReducer from './leaveAllocationReducer';
import holidayReducer from './holidayReducer';
import classGroupReducer from './classGroupReducer';
import alterationReducer from './alterationReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  utils: utilReducer,
  profile: profileReducer,
  leave: leaveReducer,
  timetable: timetableReducer,
  classes: classReducer,
  staff: staffReducer,
  courses: courseReducer,
  leaveTypes: leaveTypeReducer,
  leaveAllocations: leaveAllocationReducer,
  holidays: holidayReducer,
  classGroups: classGroupReducer,
  alterations: alterationReducer
});
