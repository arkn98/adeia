import React from 'react';
import AddUpdateCourse from './AddUpdateCourse';
import { connect } from 'react-redux';
import {
  updateCurrentRouteTitle,
  addCourse,
  updateCourse,
  getAllCourses
} from 'shared/actions';

const Container = props => {
  return <AddUpdateCourse {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  courses: state.courses
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, getAllCourses, addCourse, updateCourse }
)(Container);
