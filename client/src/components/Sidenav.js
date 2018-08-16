import React, { Component } from "react";
import styles from "./Sidenav.css";
import { Link, NavLink } from "react-router-dom";

class Sidenav extends Component {
  state = {
    isSettingsMenuVisible: false,
    mouseX: 0,
    mouseY: 0
  };

  settingsMenuClickHandler = event => {
    this.setState({ isSettingsMenuVisible: !this.state.isSettingsMenuVisible });
  };

  render() {
    let settingsMenuStyles = [];
    let settingsIconSelector = [];
    settingsMenuStyles.push(styles.settingsMenu);
    settingsIconSelector.push(styles.iconSelector);
    if (this.state.isSettingsMenuVisible) {
      settingsIconSelector.push(styles.iconSelectorHovered);
      settingsMenuStyles.push(styles.settingsMenuVisible);
    }
    return (
      <div style={{ height: "100%" }}>
        <div className={styles.sideNav}>
          <div className={styles.menu}>
            <div className={styles.logo}>
              <Link href="/" to="/dashboard">
                LMS
              </Link>
              <div className={styles.menuText}>v2.0.1</div>
              <div className={styles.customHeaderIcons}>
                <div className={styles.iconWrapper}>
                  <a
                    href="https://github.com/arkn98/lms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className={`icon ion-logo-github ${
                        styles.customHeaderIcon
                      }`}
                    />
                  </a>
                </div>
                <div className={styles.iconWrapper}>
                  <Link to="/">
                    <i
                      className={`icon ion-md-information-circle ${
                        styles.customHeaderIcon
                      }`}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.scrollMenuWrapper}>
              <div className={styles.scroller}>
                <span>
                  <div className={styles.menuItem}>
                    <Link to="/">
                      <i className={`icon ion-md-easel ${styles.customIcon}`} />
                      &nbsp;
                      <div
                        style={{ display: "inline" }}
                        className={styles.menuText}
                      >
                        Dashboard
                      </div>
                    </Link>
                  </div>
                  <div className={styles.menuItem}>
                    <Link to="/">
                      <i
                        className={`icon ion-md-list-box ${styles.customIcon}`}
                      />
                      &nbsp;
                      <div
                        style={{ display: "inline" }}
                        className={styles.menuText}
                      >
                        Apply for Leave
                      </div>
                    </Link>
                  </div>
                  <div className={styles.menuItem}>
                    <Link to="/">
                      <i className={`icon ion-md-eye ${styles.customIcon}`} />
                      &nbsp;
                      <div
                        style={{ display: "inline" }}
                        className={styles.menuText}
                      >
                        View Holidays
                      </div>
                    </Link>
                  </div>
                  <div className={styles.menuItem}>
                    <Link to="/">
                      <i className={`icon ion-md-stats ${styles.customIcon}`} />
                      &nbsp;
                      <div
                        style={{ display: "inline" }}
                        className={styles.menuText}
                      >
                        View Reports
                      </div>
                    </Link>
                  </div>
                  {/* <div className={styles.seperator} /> */}
                  <header className={styles.menuHeader}>
                    Notifications - ({this.props.notifCount})
                  </header>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.userContainer}>
            <div className={styles.userAvatar}>
              <i className={`icon ion-md-contact ${styles.customIcon}`} />
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>ark__n</span>
              <span className={styles.userClass}>#1761</span>
            </div>
            <div className={styles.userSettings}>
              <div
                className={settingsIconSelector.join(" ")}
                onClick={this.settingsMenuClickHandler}
              >
                <i
                  className={`icon ion-md-settings ${styles.customIcon}`}
                  title="Settings"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={settingsMenuStyles.join(" ")}>
          <ul>
            <li>Change Password</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidenav;
