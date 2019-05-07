import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  clearCurrentProfile,
  logoutUser,
  getAllClasses,
  getAllCourses,
  getAllStaff,
  changeTheme,
  updateCurrentRouteTitle,
  getNotificationFromSocket,
  getCurrentUser,
  getCurrentProfile
} from '../../../shared/actions';
import Dashboard from './Dashboard';

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  profile: state.profile,
  utils: state.utils,
  errors: state.errors,
  timetable: state.timetable,
  classes: state.classes,
  courses: state.courses,
  staff: state.staff,
  ...ownProps
});

const Container = connect(
  mapStateToProps,
  {
    clearCurrentProfile,
    logoutUser,
    changeTheme,
    getAllClasses,
    getCurrentUser,
    getAllCourses,
    getAllStaff,
    updateCurrentRouteTitle,
    getCurrentProfile,
    getNotificationFromSocket
  }
)(withRouter(Dashboard));

export default Container;
