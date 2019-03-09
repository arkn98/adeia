import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './App.module.scss';

import { checkDB, checkIfLoggedIn } from './shared/utils';
import { setCurrentTheme, changeTheme } from '../../shared/actions';

import Home from './Home';
import Error from './shared/components/Error';
import LoginActivate from './LoginActivate';
import ResetPassword from './ResetPassword';
import { ModalSingleButton } from './shared/common/Modal';

class App extends Component {
  state = {
    isDBUp: true,
    isLoading: true,
    modals: null
  };

  isDarkTheme = false;

  componentWillMount = () => {
    this.checkThemeFromLocalStorage();
  };

  componentDidMount = () => {
    this.checkDB();
    checkIfLoggedIn();
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

  showModal = data => {
    this.setState({ ...this.state, modals: data });
  };

  hideModal = () => {
    this.setState({ ...this.state, modals: null });
  };

  checkDB = () => {
    checkDB().then(isDBUp => {
      if (this.state.isDBUp !== isDBUp || this.state.isLoading === true) {
        this.setState({ ...this.state, isDBUp, isLoading: false });
      }
    });
  };

  checkThemeFromLocalStorage = () => {
    let prefs = localStorage.getItem('themePreferences');
    let isDarkTheme = false;
    if (prefs !== null) {
      if (prefs === 'light') isDarkTheme = false;
      else isDarkTheme = true;
    } else {
      isDarkTheme = false;
    }
    this.props.setCurrentTheme(isDarkTheme);
  };

  render = () => {
    const { isDarkTheme = false } = this.props;
    if (this.state.isDBUp) {
      let modals = null;
      if (this.state.modals && this.state.modals.type !== null) {
        if (this.state.modals.type === 'modalSingleButton') {
          modals = (
            <div className={styles.modals}>
              <ModalSingleButton
                hideModal={this.hideModal}
                {...this.state.modals}
              />
            </div>
          );
        }
      }

      return (
        <div
          style={{ height: '100%' }}
          className={!isDarkTheme ? 'lightTheme' : null}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/login"
              key="login"
              render={() => <LoginActivate showModal={this.showModal} />}
            />
            <Route
              exact
              path="/activate"
              key="activate"
              render={() => <LoginActivate />}
            />
            <Route
              exact
              path="/reset-password"
              render={() => <ResetPassword showModal={this.showModal} />}
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
          {modals}
        </div>
      );
    } else {
      return (
        <div
          style={{ height: '100%' }}
          className={!isDarkTheme ? 'lightTheme' : null}>
          <Error
            message="Please try after sometime or contact administrator."
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
  { setCurrentTheme, changeTheme },
  null,
  { pure: false }
)(App);
