import React, { Component } from 'react';
import styles from './Dashboard.css';
import Sidenav from './components/Sidenav';
import { Switch, Route, withRouter } from 'react-router-dom';
import Main from './components/Main';
import LeaveApplication from './components/LeaveApplication';
import ViewHolidays from './components/ViewHolidays';
import PropTypes from 'prop-types';
import AddStaff from './components/AddStaff';
import AddAdmin from './components/AddAdmin';
import { connect } from 'react-redux';
import { getCurrentProfile } from './actions/profileActions';

class Dashboard extends Component {
  state = {
    notifCount: 0,
    mouseX: 0,
    mouseY: 0
  };

  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;

    return (
      <div className={styles.dashMount}>
        <div className={styles.sideNavWrapper}>
          <Sidenav />
        </div>
        <div className={styles.mainWrapper}>
          <Switch>
            <Route
              path="/dashboard/apply"
              exact
              component={LeaveApplication}
              notifCount={this.state.notifCount}
            />
            <Route
              path="/dashboard/view-holidays"
              exact
              component={ViewHolidays}
              notifCount={this.state.notifCount}
            />
            <Route
              path="/dashboard/add-staff"
              exact
              component={AddStaff}
              notifCount={this.state.notifCount}
            />
            <Route
              path="/dashboard/add-admin"
              exact
              component={AddAdmin}
              notifCount={this.state.notifCount}
            />
            <Route
              path="/dashboard"
              exact
              component={Main}
              notifCount={this.state.notifCount}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withRouter(Dashboard));
