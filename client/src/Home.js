import React, { Component } from 'react';
import styles from './Home.module.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Home extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  render() {
    const { isDarkTheme } = this.props.utils;

    return (
      <div
        style={{ height: '100%' }}
        className={
          isDarkTheme ? styles.app : `${styles.app} ${styles.lightTheme}`
        }>
        <div className={styles.banner}>
          <div className={styles.title}>
            Welcome to LMS - Leave Management System
          </div>
          <div className={styles.text}>
            An all-in-one application to apply for leaves, manage and keep track
            of them, for the Department of Information Science & Technology.
          </div>
          <div className={styles.buttons}>
            <Link to="/login">
              <div
                style={{ flex: '1 1 auto' }}
                className={`${styles.buttonWhite} ${styles.button}`}>
                Login
              </div>
            </Link>
            <Link to="/activate">
              <div
                style={{ flex: '1 1 auto' }}
                className={`${styles.buttonPrimary} ${styles.button}`}>
                Activate Account
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.footer}>
          <div>
            Currently maintained by&nbsp;
            <a
              title="My GitHub user page"
              href="https://github.com/arkn98"
              target="_blank"
              rel="noopener noreferrer">
              Arun Kumar
            </a>
          </div>
          <div>|</div>
          <div>
            <a
              title="GitHub repo"
              href="https://github.com/arkn98/lms"
              target="_blank"
              rel="noopener noreferrer">
              View Source Code
            </a>
          </div>
          <div>|</div>
          <div>
            <a
              title="Report an issue"
              href="https://github.com/arkn98/lms/issues"
              target="_blank"
              rel="noopener noreferrer">
              Report an issue
            </a>
          </div>
          <div>|</div>
          <div>
            <a
              title="Submit your feedback"
              href="https://github.com/arkn98/lms"
              target="_blank"
              rel="noopener noreferrer">
              Feedback
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  utils: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  utils: state.utils
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Home));
