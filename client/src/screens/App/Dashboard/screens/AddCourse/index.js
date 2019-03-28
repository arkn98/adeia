import React from 'react';
import AddCourse from './AddCourse';
import { connect } from 'react-redux';
import { updateCurrentRouteTitle, addCourse } from 'shared/actions';

const Container = props => {
  return <AddCourse {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, addCourse }
)(Container);
