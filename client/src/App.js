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
        <Route exact path="/login" component={Login} />
        <Route exact path="/activate" component={Activate} />
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route component={PageNotFound} />
        </Switch>
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

export default App;
