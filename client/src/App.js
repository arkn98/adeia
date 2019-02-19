import React, { Component } from 'react';
import Home from './components/Home';
import PageNotFound from './PageNotFound';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import TestContainer from './containers/DashboardContainer';
import LoginActivateContainer from './containers/LoginActivateContainer';
import ForgotPasswordContainer from './containers/ResetPasswordContainer';

class App extends Component {
  componentDidMount = () => {
    const element = document.getElementById('spinnerContainer');
    if (element) {
      element.outerHTML = '';
    }
  };

  render() {
    const props = this.props;
    const { auth, utils, errors, logoutUser } = props;
    const { isDarkTheme } = utils;
    const { isAuthenticated, user } = auth;
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
              component={TestContainer}
            />
            <Route render={() => <PageNotFound isDarkTheme={isDarkTheme} />} />
          </Switch>
          <Route render={() => <PageNotFound isDarkTheme={isDarkTheme} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
