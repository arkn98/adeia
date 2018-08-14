import React, { Component } from "react";
/* import styles from "./App.css"; */
import Home from "./Home";
import Login from "./Login";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    );
  }
}

export default App;
