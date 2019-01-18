import { connect } from 'react-redux';
import {
  changeTheme,
  showLogoutPopup,
  hideLogoutPopup,
  updateCurrentRouteTitle
} from '../actions/utilActions';
import { logoutUser } from '../actions/authActions';
import { addLeave } from '../actions/leaveActions';
import {
  clearCurrentProfile,
  getCurrentProfile
} from '../actions/profileActions';
import {
  getAllClasses,
  getAllCourses,
  getAllStaff
} from '../actions/timetableActions';
import Dashboard from '../Dashboard';

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  utils: state.utils,
  errors: state.errors,
  timetable: state.timetable,
  classes: state.classes,
  courses: state.courses,
  staff: state.staff
});

const testContainer = connect(
  mapStateToProps,
  {
    getCurrentProfile,
    hideLogoutPopup,
    clearCurrentProfile,
    logoutUser,
    changeTheme,
    showLogoutPopup,
    getAllClasses,
    getAllCourses,
    getAllStaff,
    updateCurrentRouteTitle,
    addLeave
  }
)(Dashboard);

export default testContainer;
