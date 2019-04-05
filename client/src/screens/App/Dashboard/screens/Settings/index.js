import React from 'react';
import { connect } from 'react-redux';
import Settings from './Settings';
import { updateCurrentRouteTitle } from 'shared/actions';

const Container = props => {
  return <Settings {...props} />;
};

const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle }
)(Container);
