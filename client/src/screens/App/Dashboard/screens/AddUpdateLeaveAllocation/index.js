import React from 'react';
import AddUpdateLeaveAllocation from './AddUpdateLeaveAllocation';
import { connect } from 'react-redux';
import {
  updateCurrentRouteTitle,
  getAllLeaveTypes,
  getAllLeaveAllocations,
  updateLeaveAllocation
} from 'shared/actions';

const Container = props => {
  return <AddUpdateLeaveAllocation {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  utils: state.utils,
  errors: state.errors,
  leaveAllocations: state.leaveAllocations,
  leaveTypes: state.leaveTypes
});

export default connect(
  mapStateToProps,
  {
    updateCurrentRouteTitle,
    getAllLeaveTypes,
    getAllLeaveAllocations,
    updateLeaveAllocation
  }
)(Container);
