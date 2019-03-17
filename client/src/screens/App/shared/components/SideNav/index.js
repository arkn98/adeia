import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTheme } from 'shared/actions';
import SideNav from './SideNav';

class SideNavContainer extends Component {
  render = () => {
    return <SideNav {...this.props} />;
  };
}

const mapStateToProps = state => ({
  isDarkTheme: state.utils.isDarkTheme
});

export default connect(
  mapStateToProps,
  { changeTheme }
)(SideNavContainer);
