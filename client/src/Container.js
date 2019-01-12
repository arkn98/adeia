import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getCurrentProfile } from './actions/profileActions';
import {
  getAllClasses,
  getAllCourses,
  getAllStaff
} from './actions/timetableActions';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import Spinner from './components/common/Spinner';

class Container extends Component {
  state = {
    isLoading: true
  };

  componentDidMount = () => {
    Promise.all([
      this.props.getCurrentProfile(false),
      this.props.getAllClasses(),
      this.props.getAllCourses(),
      this.props.getAllStaff()
    ]).then(() => {
      this.setState({ ...this.state, isLoading: false });
    });
  };

  render = () => {
    const { isLoading } = this.state;
    if (isLoading) return <Spinner isDarkTheme={this.props.isDarkTheme} />;
    else
      return (
        <Dashboard
          location={this.props.location}
          auth={this.props.auth}
          classes={this.props.classes}
          courses={this.props.courses}
          profile={this.props.profile}
          staff={this.props.staff}
          timetable={this.props.timetable}
          utils={this.props.utils}
        />
      );
  };
}

Container.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  timetable: PropTypes.object.isRequired,
  utils: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getAllClasses: PropTypes.func.isRequired,
  getAllCourses: PropTypes.func.isRequired,
  getAllStaff: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  utils: state.utils,
  timetable: state.timetable,
  classes: state.classes,
  courses: state.courses,
  staff: state.staff
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getAllClasses,
    getAllCourses,
    getAllStaff
  }
)(withRouter(Container));
