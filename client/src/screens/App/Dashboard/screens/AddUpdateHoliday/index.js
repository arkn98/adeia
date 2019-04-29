import React from 'react';
import AddUpdateHoliday from './AddUpdateHoliday';
import { connect } from 'react-redux';
import {
  updateCurrentRouteTitle,
  addHoliday,
  getAllHolidays,
  updateHolidays
} from 'shared/actions';

const Container = props => {
  return <AddUpdateHoliday {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  holidays: state.holidays
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, addHoliday, getAllHolidays, updateHolidays }
)(Container);
