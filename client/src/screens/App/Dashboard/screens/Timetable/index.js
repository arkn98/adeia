import { connect } from 'react-redux';
import Timetable from './Timetable';
import { withRouter } from 'react-router-dom';
import {
  getTimetable,
  updateCurrentRouteTitle,
  getAllClasses,
  getAllStaff,
  getAllCourses,
  addUpdateTimetable,
  uploadTimetable
} from 'shared/actions';

const mapStateToProps = state => ({
  auth: state.auth,
  utils: state.utils,
  errors: state.errors,
  profile: state.profile,
  classes: state.classes,
  courses: state.courses,
  timetable: state.timetable,
  staff: state.staff
});

const Container = connect(
  mapStateToProps,
  {
    getTimetable,
    updateCurrentRouteTitle,
    getAllClasses,
    getAllStaff,
    getAllCourses,
    addUpdateTimetable,
    uploadTimetable
  }
)(withRouter(Timetable));

export default Container;
