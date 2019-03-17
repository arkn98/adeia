import React from 'react';
import LeaveApplication from './LeaveApplication';
import { connect } from 'react-redux';
import { updateCurrentRouteTitle, addLeave } from 'shared/actions';

const Container = props => {
  return <LeaveApplication {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
  staff: state.staff,
  leave: state.leave
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, addLeave }
)(Container);
