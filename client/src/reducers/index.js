import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import utilReducer from './utilReducer';
import timetableReducer from './timetableReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  utils: utilReducer,
  timetable: timetableReducer
});
