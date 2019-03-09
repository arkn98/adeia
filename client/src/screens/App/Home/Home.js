import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import styles from '../shared/styles/FullPageLanding.module.scss';
import { ButtonPrimary, ButtonWhite } from '../shared/common/Button';
import { Footer } from '../shared/components/Footer';

const Home = props => {
  const { isAuthenticated, username, history, logoutUser } = props;
  return (
    <div className={styles.app}>
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
            <Fragment>
              <Link to="/dashboard">
                <ButtonPrimary>Dashboard</ButtonPrimary>
              </Link>
              <div>
                <ButtonWhite
                  onClick={event => {
                    logoutUser();
                    history.push('/login');
                  }}>
                  Not your account? Log in
                </ButtonWhite>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <Link to="/login">
                <ButtonPrimary>Login</ButtonPrimary>
              </Link>
              <Link to="/activate">
                <ButtonWhite>Activate Account</ButtonWhite>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
      <Footer altColors={true} />
    </div>
  );
};

export default Home;
