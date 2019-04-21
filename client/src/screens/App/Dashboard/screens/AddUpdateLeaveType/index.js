import React from 'react';
import AddUpdateLeaveType from './AddUpdateLeaveType';
import { connect } from 'react-redux';
import {
  updateCurrentRouteTitle,
  addLeaveType,
  getAllLeaveTypes,
  updateLeaveType
} from 'shared/actions';

const Container = props => {
  return <AddUpdateLeaveType {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  leaveTypes: state.leaveTypes
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, addLeaveType, getAllLeaveTypes, updateLeaveType }
)(Container);
