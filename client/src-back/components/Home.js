import React, { Fragment } from 'react';
import styles from './Home.module.css';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from './common/Footer';

class Home extends React.Component {
  componentDidMount = () => {
    const element = document.getElementById('spinnerContainer');
    if (element) {
      element.outerHTML = '';
    }
  };

  render = () => {
    const { isAuthenticated, username = '', history, logoutUser } = this.props;
    return (
      <div style={{ height: '100%' }} className={styles.app}>
        <div className={styles.banner}>
          <div className={styles.title}>
            {isAuthenticated
              ? `Welcome back, ${username}`
              : 'Welcome to LMS - Leave Management System'}
          </div>
          <div className={styles.text}>
            An all-in-one application to apply for leaves, manage and keep track
            of them, for the Department of Information Science & Technology.
          </div>
          <div className={styles.buttons}>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <div className={`${styles.buttonPrimary} ${styles.button}`}>
                    Dashboard
                  </div>
                </Link>
                <div>
                  <div
                    className={`${styles.buttonWhite} ${styles.button}`}
                    onClick={event => {
                      logoutUser();
                      history.push('/login');
                    }}>
                    Not your account? Log in
                  </div>
                </div>
              </>
            ) : (
              <Fragment>
                <Link to="/login">
                  <div className={`${styles.buttonWhite} ${styles.button}`}>
                    Login
                  </div>
                </Link>
                <Link to="/activate">
                  <div className={`${styles.buttonPrimary} ${styles.button}`}>
                    Activate Account
                  </div>
                </Link>
              </Fragment>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired
};

Home.defaultProps = {
  isAuthenticated: false,
  username: ''
};

export default withRouter(Home);
