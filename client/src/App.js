import React, { Component } from 'react';
/* import styles from "./App.css"; */
import Home from './Home';
import Login from './Login';
import Activate from './Activate';
import Dashboard from './Dashboard';
import PageNotFound from './PageNotFound';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import ForgotPassword from './ForgotPassword';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/login"
          render={() => <Login isDarkTheme={this.props.isDarkTheme} />}
        />
        <Route
          exact
          path="/activate"
          render={() => <Activate isDarkTheme={this.props.isDarkTheme} />}
        />
        <Route path="/reset-password/:token" component={ForgotPassword} />
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route
            render={() => <PageNotFound isDarkTheme={this.props.isDarkTheme} />}
          />
        </Switch>
        <Route
          render={() => <PageNotFound isDarkTheme={this.props.isDarkTheme} />}
        />
      </Switch>
    );
  }
}

export default App;
