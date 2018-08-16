import React, { Component } from "react";
import styles from "./Dashboard.css";
import Sidenav from "./components/Sidenav";

class Dashboard extends Component {
  state = {
    notifCount: 0,
    mouseX: 0,
    mouseY: 0
  };

  render() {
    return (
      <div className={styles.dashMount}>
        <div className={styles.sideNavWrapper}>
          <Sidenav notifCount={this.state.notifCount} />
        </div>
        <div className={styles.mainWrapper}>
          <a href="/">123454321</a>
        </div>
        <div>
          <a href="/">123</a>
        </div>
      </div>
    );
  }
}

export default Dashboard;
