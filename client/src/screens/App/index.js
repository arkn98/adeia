import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './App.module.scss';
import { checkDB as checkDBAction } from './shared/utils';
import {
  setCurrentTheme,
  changeTheme,
  logoutUser,
  markAllAsRead,
  markIndexAsRead
} from '../../shared/actions';
import { ModalSingleButton, ModalDoubleButton } from './shared/common/Modal';
import { FullPageSpinner } from './shared/common/Spinner';
import { Notifications } from './shared/components/Notifications';
import { PrivateRoute } from './shared/common/PrivateRoute';

const Home = lazy(() => import('./Home'));
const Error = lazy(() => import('./shared/components/Error'));
const LoginActivate = lazy(() => import('./LoginActivate'));
const ResetPassword = lazy(() => import('./ResetPassword'));
const Dashboard = lazy(() => import('./Dashboard'));

class App extends Component {
  state = {
    isDBUp: true,
    isLoading: true,
    popouts: null
  };

  componentDidMount = () => {
    this.checkDB();
    this.interval = setInterval(() => {
      this.checkDB();
    }, 10000);
  };

  componentDidUpdate = () => {
    const element = document.getElementById('spinnerContainer');
    if (element) {
      element.outerHTML = '';
    }
  };

  markIndexAsRead = (index, notificationId) => {
    this.props.markIndexAsRead(index, notificationId);
  };

  markAllAsReadHandler = event => {
    event.preventDefault();
    this.props.markAllAsRead();
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  showPopout = data => {
    this.setState({ ...this.state, popouts: data });
  };

  hidePopout = () => {
    this.setState({ ...this.state, popouts: null });
  };

  checkDB = () => {
    checkDBAction().then(isDBUp => {
      if (this.state.isDBUp !== isDBUp || this.state.isLoading === true) {
        this.setState({ ...this.state, isDBUp, isLoading: false });
      }
    });
  };

  render = () => {
    const { isDarkTheme = false } = this.props;

    if (this.state.isDBUp) {
      let modals = null;
      if (this.state.popouts && this.state.popouts.type !== null) {
        if (this.state.popouts.type === 'modalSingleButton') {
          modals = (
            <div className={styles.popouts}>
              <ModalSingleButton
                hidePopout={this.hidePopout}
                {...this.state.popouts}
              />
            </div>
          );
        } else if (this.state.popouts.type === 'notifications') {
          let notifications = [];
          let notificationsNew = [];
          this.props.profile.profile.notifications
            .slice(0)
            .reverse()
            .forEach(item => {
              if (item.isNew) {
                notificationsNew.push(item);
              } else {
                notifications.push(item);
              }
            });
          modals = (
            <Notifications
              markAllAsReadHandler={this.markAllAsReadHandler}
              notificationsNew={notificationsNew}
              notifications={notifications}
              hidePopout={this.hidePopout}
              markIndexAsRead={this.markIndexAsRead}
              {...this.state.popouts}
            />
          );
        } else if (this.state.popouts.type === 'logout') {
          modals = (
            <div className={styles.popouts}>
              <ModalDoubleButton
                hidePopout={this.hidePopout}
                {...this.state.popouts}
                action1={() => this.props.logoutUser()}
              />
            </div>
          );
        }
      } else {
        modals = null;
      }

      return (
        <div
          style={{ height: '100%' }}
          id="theme"
          className={!isDarkTheme ? 'lightTheme' : null}>
          {modals}
          <Suspense fallback={<FullPageSpinner />}>
            <Switch>
              <Route
                exact
                path="/"
                key="home"
                render={() => <Home showPopout={this.showPopout} />}
              />
              <Route
                exact
                path="/login"
                key="login"
                render={() => <LoginActivate showPopout={this.showPopout} />}
              />
              <Route
                exact
                path="/activate"
                key="activate"
                render={() => <LoginActivate showPopout={this.showPopout} />}
              />
              <Route
                exact
                path="/reset-password"
                render={() => <ResetPassword showPopout={this.showPopout} />}
              />
              <Switch>
                <PrivateRoute
                  location={this.props.location}
                  path="/dashboard"
                  component={Dashboard}
                  showPopout={this.showPopout}
                />
                <Route
                  render={() => (
                    <Error
                      message="We can't find the page that you're looking for :("
                      footerAltColors={true}
                      showButton={true}
                      showIllustration="not-found"
                      buttonLocation="back"
                      buttonContent="Go back">
                      404
                    </Error>
                  )}
                />
              </Switch>
              <Route
                render={() => (
                  <Error
                    message="We can't find the page that you're looking for :("
                    footerAltColors={true}
                    showButton={true}
                    showIllustration="not-found"
                    buttonLocation="back"
                    buttonContent="Go back">
                    404
                  </Error>
                )}
              />
            </Switch>
          </Suspense>
        </div>
      );
    } else {
      return (
        <div
          style={{ height: '100%' }}
          className={!isDarkTheme ? 'lightTheme' : null}>
          <Error
            message="Please check back after sometime or contact the administrator."
            footerAltColors={true}
            showIllustration="server-down"
            showButton={false}>
            Backend Server is down
          </Error>
        </div>
      );
    }
  };
}

const mapStateToProps = state => ({
  isDarkTheme: state.utils.isDarkTheme,
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { setCurrentTheme, changeTheme, logoutUser, markAllAsRead, markIndexAsRead },
  null,
  { pure: false }
)(App);
