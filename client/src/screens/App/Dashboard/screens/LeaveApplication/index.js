import React from 'react';
import LeaveApplication from './LeaveApplication';
import { connect } from 'react-redux';
import {
  updateCurrentRouteTitle,
  addLeave,
  getAllLeaveTypes,
  getAllStaff,
  getAllLeaveAllocations,
  getTimetableSlotsToAlternate,
  getAllHolidays
} from 'shared/actions';

const Container = props => {
  return <LeaveApplication {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  utils: state.utils,
  errors: state.errors,
  profile: state.profile,
  staff: state.staff,
  leave: state.leave,
  holidays: state.holidays,
  leaveAllocations: state.leaveAllocations,
  leaveTypes: state.leaveTypes
});

export default connect(
  mapStateToProps,
  {
    updateCurrentRouteTitle,
    addLeave,
    getAllStaff,
    getAllLeaveTypes,
    getAllLeaveAllocations,
    getTimetableSlotsToAlternate,
    getAllHolidays
  }
)(Container);
