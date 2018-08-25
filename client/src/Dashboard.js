import React, { Component } from 'react';
import styles from './Dashboard.css';
import Sidenav from './components/Sidenav';
import Main from './components/Main';

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
          <Sidenav />
        </div>
        <div className={styles.mainWrapper}>
          <Main notifCount={this.state.notifCount} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
