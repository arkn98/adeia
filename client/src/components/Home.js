import React, { Fragment } from 'react';
import styles from './Home.module.css';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from './common/Footer';

const Home = props => {
  const { isAuthenticated, username = '', history } = props;

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
                    props.logoutUser();
                    history.push('/login');
                  }}>
                  Not your account? Login
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

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired
};

export default withRouter(Home);
