import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from '../shared/styles/FullPageLanding.module.scss';
import { ButtonPrimary, ButtonWhite } from '../shared/common/Button';
import { Footer } from '../shared/components/Footer';
import changelog from 'data/changelog';

const Home = props => {
  const { isAuthenticated, username, history, logoutUser } = props;
  /* console.log(
    dayjs()
      .add(7, 'day')
      .toISOString()
  ); */
  /* console.log(
    dayjs()
      .toISOString()
  ); */

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
          of them.
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
      {dayjs().isBefore(dayjs(changelog.changelog[0].showTill), 'day') ? (
        <div className={styles.changelogButtonHolder}>
          <div
            onClick={() => {
              props.showPopout({
                type: 'modalSingleButton',
                title: 'Change log',
                message: changelog.changelog[0].content,
                buttonPrimary: true,
                buttonContent: 'Close'
              });
            }}
            className={styles.changelogButton}>
            {changelog.changelog[0].cta}
          </div>
        </div>
      ) : null}
      <Footer altColors={true} />
    </div>
  );
};

export default withRouter(Home);
