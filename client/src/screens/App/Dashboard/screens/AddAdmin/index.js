import React from 'react';
import AddAdmin from './AddAdmin';
import { connect } from 'react-redux';
import { updateCurrentRouteTitle, registerUser } from 'shared/actions';

const Container = props => {
  return <AddAdmin {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, registerUser }
)(Container);
