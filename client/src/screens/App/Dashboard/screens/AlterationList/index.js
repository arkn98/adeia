import React from 'react';
import AlterationList from './AlterationList';
import { connect } from 'react-redux';
import { updateCurrentRouteTitle, getAlterations } from 'shared/actions';

const Container = props => {
  return <AlterationList {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
  staff: state.staff,
  alterations: state.alterations
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, getAlterations }
)(Container);
