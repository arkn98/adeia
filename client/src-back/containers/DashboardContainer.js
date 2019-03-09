import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  getCurrentProfile,
  clearCurrentProfile
} from '../actions/profileActions';
import Dashboard from '../Dashboard';
import { connect } from 'react-redux';
import {
  getAllClasses,
  getAllCourses,
  getAllStaff
} from '../actions/timetableActions';
import {
  changeTheme,
  showLogoutPopup,
  hideLogoutPopup,
  updateCurrentRouteTitle
} from '../actions/utilActions';
import { logoutUser } from '../actions/authActions';

class Container extends Component {
  state = {
    isLoading: true
  };

  componentDidMount = () => {
    /* Promise.all([
      /* this.props.getAllClasses(),
      this.props.getAllCourses(),
      this.props.getAllStaff()
    ]).then(() => { */
    this.setState({ ...this.state, isLoading: false });
    const element = document.getElementById('spinnerContainer');
    if (element) {
      element.outerHTML = '';
    }
    /* }); */
  };

  render = () => {
    const { isLoading } = this.state;
    if (isLoading) return null;
    else
      return (
        <Dashboard
          location={this.props.location}
          auth={this.props.auth}
          classes={this.props.classes}
          courses={this.props.courses}
          errors={this.props.errors}
          profile={this.props.profile}
          staff={this.props.staff}
          timetable={this.props.timetable}
          getAllClasses={this.props.getAllClasses}
          getAllCourses={this.props.getAllCourses}
          getAllStaff={this.props.getAllStaff}
          utils={this.props.utils}
          getCurrentProfile={this.props.getCurrentProfile}
          updateCurrentRouteTitle={this.props.updateCurrentRouteTitle}
          changeTheme={this.props.changeTheme}
          showLogoutPopup={this.props.showLogoutPopup}
          hideLogoutPopup={this.props.hideLogoutPopup}
          logoutUser={this.props.logoutUser}
          clearCurrentProfile={this.props.clearCurrentProfile}
        />
      );
  };
}

Container.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  timetable: PropTypes.object.isRequired,
  utils: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  hideLogoutPopup: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
  showLogoutPopup: PropTypes.func.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired,
  getAllClasses: PropTypes.func.isRequired,
  getAllCourses: PropTypes.func.isRequired,
  getAllStaff: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  utils: state.utils,
  errors: state.errors,
  timetable: state.timetable,
  classes: state.classes,
  courses: state.courses,
  staff: state.staff
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    hideLogoutPopup,
    clearCurrentProfile,
    logoutUser,
    changeTheme,
    showLogoutPopup,
    getAllClasses,
    getAllCourses,
    getAllStaff,
    updateCurrentRouteTitle
  }
)(withRouter(Container));
