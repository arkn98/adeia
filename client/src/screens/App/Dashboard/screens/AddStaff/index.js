import React from 'react';
import AddStaff from './AddStaff';
import { connect } from 'react-redux';
import { updateCurrentRouteTitle, registerStaff } from 'shared/actions';

const Container = props => {
  return <AddStaff {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, registerStaff }
)(Container);
