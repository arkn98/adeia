import React, { Fragment } from 'react';
import styles from './Home.module.css';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from './common/Footer';

const Home = props => {
  const { isDarkTheme, isAuthenticated } = props;

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
          {isAuthenticated ? (
            <Link to="/dashboard">
              <div className={`${styles.buttonPrimary} ${styles.button}`}>
                Dashboard
              </div>
            </Link>
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
      <Footer isDarkTheme={isDarkTheme} />
    </div>
  );
};

Home.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default withRouter(Home);
