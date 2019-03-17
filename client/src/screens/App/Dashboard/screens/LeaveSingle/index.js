import React from 'react';
import LeaveSingle from './LeaveSingle';
import { connect } from 'react-redux';
import { updateCurrentRouteTitle, addLeave, getLeaves } from 'shared/actions';

const Container = props => {
  return <LeaveSingle {...props} />;
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
  { updateCurrentRouteTitle, addLeave, getLeaves }
)(Container);
