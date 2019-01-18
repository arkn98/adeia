import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from '../App';

const mapStateToProps = state => ({
  auth: state.auth,
  utils: state.utils
});

const appContainer = connect(
  mapStateToProps,
  {}
)(App);

export default withRouter(appContainer);
