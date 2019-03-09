import React, { Component } from 'react';
import Home from './components/Home';
import PageNotFound from './PageNotFound';
import styles from './components/Home.module.css';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import DashboardContainer from './containers/DashboardContainer';
import LoginActivateContainer from './containers/LoginActivateContainer';
import ForgotPasswordContainer from './containers/ResetPasswordContainer';
import axios from 'axios';
import Footer from './components/common/Footer';

class App extends Component {
  state = {
    isDbUp: true
  };

  componentWillMount = () => {
    axios
      .get('/api/utils/check-db')
      .then(res => {
        this.setState({
          ...this.state,
          isDbUp: res.data.status === 1 ? true : false
        });
      })
      .then(err => console.log(err));
  };

  render() {
    const props = this.props;
    const { auth, utils, logoutUser } = props;
    const { isDarkTheme } = utils;
    const { isAuthenticated, user } = auth;
    if (this.state.isDbUp)
      return (
        <div
          className={!isDarkTheme ? 'lightTheme' : null}
          style={{ height: '100%' }}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  isAuthenticated={isAuthenticated}
                  username={user.name}
                  isDarkTheme={isDarkTheme}
                  logoutUser={logoutUser}
                />
              )}
            />
            <Route
              exact
              path="/login"
              key="login"
              render={() => (
                <LoginActivateContainer
                  isDarkTheme={isDarkTheme}
                  isAuthenticated={isAuthenticated}
                />
              )}
            />
            <Route
              exact
              key="activate"
              path="/activate"
              render={() => (
                <LoginActivateContainer
                  isDarkTheme={isDarkTheme}
                  isAuthenticated={isAuthenticated}
                />
              )}
            />
            <Route
              path="/reset-password"
              render={() => (
                <ForgotPasswordContainer
                  isDarkTheme={isDarkTheme}
                  isAuthenticated={isAuthenticated}
                />
              )}
            />
            <Switch>
              <PrivateRoute
                location={this.props.location}
                path="/dashboard"
                component={DashboardContainer}
              />
              <Route
                render={() => <PageNotFound isDarkTheme={isDarkTheme} />}
              />
            </Switch>
            <Route render={() => <PageNotFound isDarkTheme={isDarkTheme} />} />
          </Switch>
        </div>
      );
    else
      return (
        <div
          className={!isDarkTheme ? 'lightTheme' : null}
          style={{ height: '100%' }}>
          <div style={{ height: '100%' }} className={styles.app}>
            <div className={styles.banner}>
              <div
                className={styles.title}
                style={{
                  fontWeight: '800',
                  fontSize: '48px',
                  paddingBottom: '12px'
                }}>
                DB currently down
              </div>
              <div className={styles.text}>
                Please check back sometime later or contact administrator :(
              </div>
            </div>
            <Footer altStyle={true} />
          </div>
        </div>
      );
  }
}

export default App;
