import React from 'react';
import ViewHolidays from './ViewHolidays';
import { connect } from 'react-redux';
import { updateCurrentRouteTitle, getAllHolidays } from 'shared/actions';

const Container = props => {
  return <ViewHolidays {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  holidays: state.holidays
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, getAllHolidays }
)(Container);
