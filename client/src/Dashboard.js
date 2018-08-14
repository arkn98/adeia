import React, { Component } from "react";
import styles from "./Dashboard.css";
import Sidenav from "./components/Sidenav";

class Dashboard extends Component {
  render() {
    return (
      <div className={styles.dashMount}>
        <div className={styles.sideNavWrapper}>
          <Sidenav />
        </div>
        <div className={styles.mainWrapper}>abcd</div>
      </div>
    );
  }
}

export default Dashboard;
