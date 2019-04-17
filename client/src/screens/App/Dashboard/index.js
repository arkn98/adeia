import { withRouter } from 'react-router-dom';
import {
  clearCurrentProfile,
  logoutUser,
  getAllClasses,
  getAllCourses,
  getAllStaff,
  changeTheme,
  updateCurrentRouteTitle,
  getCurrentUser
} from '../../../shared/actions';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';

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
    updateCurrentRouteTitle
  }
)(withRouter(Dashboard));

export default Container;
