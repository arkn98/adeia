import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './App.module.scss';

import { checkDB as checkDBAction } from './shared/utils';
import { setCurrentTheme, changeTheme, logoutUser } from '../../shared/actions';

import Home from './Home';
import Error from './shared/components/Error';
import LoginActivate from './LoginActivate';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';
//import Dashboard2 from './DashboardContainer';
import { ModalSingleButton, ModalDoubleButton } from './shared/common/Modal';
import { Notifications } from './shared/components/Notifications';
import { PrivateRoute } from './shared/common/PrivateRoute';

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
          modals = (
            <Notifications
              hidePopout={this.hidePopout}
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
          <Switch>
            <Route exact path="/" component={Home} />
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
              {/* <Route path="/dashboard2" component={Dashboard2} /> */}
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
                  buttonLocation="back"
                  buttonContent="Go back">
                  404
                </Error>
              )}
            />
          </Switch>
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
            showButton={false}>
            DB Down
          </Error>
        </div>
      );
    }
  };
}

const mapStateToProps = state => ({
  isDarkTheme: state.utils.isDarkTheme
});

export default connect(
  mapStateToProps,
  { setCurrentTheme, changeTheme, logoutUser },
  null,
  { pure: false }
)(App);
