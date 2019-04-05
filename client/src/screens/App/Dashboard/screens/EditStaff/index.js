import React from 'react';
import EditStaff from './EditStaff';
import { connect } from 'react-redux';
import {
  updateCurrentRouteTitle,
  getAllStaff,
  updateStaff
} from 'shared/actions';

const Container = props => {
  return <EditStaff {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  staff: state.staff
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, getAllStaff, updateStaff }
)(Container);
