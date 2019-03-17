import React from 'react';
import Main from './Main';
import { connect } from 'react-redux';
import { updateCurrentRouteTitle } from 'shared/actions';

const Container = props => {
  return <Main {...props} />;
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle }
)(Container);
