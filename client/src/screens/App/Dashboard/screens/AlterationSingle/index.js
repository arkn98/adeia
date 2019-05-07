import React from 'react';
import { connect } from 'react-redux';
import {
  updateCurrentRouteTitle,
  getTimetable,
  setAlterationAsViewed,
  setAlterationStatus,
  getAlterations
} from 'shared/actions';
import AlterationSingle from './AlterationSingle';

const Container = props => {
  return <AlterationSingle {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
  staff: state.staff,
  alterations: state.alterations,
  timetable: state.timetable
});

export default connect(
  mapStateToProps,
  {
    updateCurrentRouteTitle,
    setAlterationAsViewed,
    setAlterationStatus,
    getTimetable,
    getAlterations
  }
)(Container);
