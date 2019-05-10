import React from 'react';
import LeaveAcceptReject from './LeaveAcceptReject';
import { connect } from 'react-redux';
import {
  updateCurrentRouteTitle,
  leaveAcceptRejectHOD,
  getLeaves
} from 'shared/actions';

const Container = props => {
  return <LeaveAcceptReject {...props} />;
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
  { updateCurrentRouteTitle, getLeaves, leaveAcceptRejectHOD }
)(Container);
