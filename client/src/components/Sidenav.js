import React, { Component } from 'react';
import styles from './Sidenav.css';
import { Link, NavLink } from 'react-router-dom';

class Sidenav extends Component {
  state = {
    isSettingsMenuVisible: false
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
      <div style={{ height: '100%', overflowY: 'hidden' }}>
        <div className={styles.sideNav}>
          <div className={styles.menu}>
            <div className={styles.logo}>
              <Link title="Leave Management System" href="/" to="/dashboard">
                LMS
              </Link>
              <div className={styles.menuText}>v2.0.1</div>
              <div className={styles.customHeaderIcons}>
                <div className={styles.iconWrapper}>
                  <a
                    title="GitHub Repo"
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
                      title="Info"
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
                  <NavLink
                    to="/dashboard"
                    exact
                    className={styles.menuItem}
                    activeClassName={styles.menuItemActive}
                  >
                    <i className={`icon ion-md-easel ${styles.customIcon}`} />
                    &nbsp;
                    <div
                      style={{ display: 'inline' }}
                      className={styles.menuText}
                    >
                      Dashboard
                    </div>
                  </NavLink>
                  {/* <div className={styles.seperator} /> */}
                  <header className={styles.menuHeader}>Leaves</header>
                  <NavLink
                    to="/dashboard/apply"
                    exact
                    className={styles.menuItem}
                    activeClassName={styles.menuItemActive}
                  >
                    <i
                      className={`icon ion-md-list-box ${styles.customIcon}`}
                    />
                    &nbsp;
                    <div
                      style={{ display: 'inline' }}
                      className={styles.menuText}
                    >
                      Apply for Leave
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/leave-status"
                    exact
                    className={styles.menuItem}
                    activeClassName={styles.menuItemActive}
                  >
                    <i
                      className={`icon ion-md-checkbox-outline ${
                        styles.customIcon
                      }`}
                    />
                    &nbsp;
                    <div
                      style={{ display: 'inline' }}
                      className={styles.menuText}
                    >
                      Leave Status
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/cpl-credits"
                    exact
                    className={styles.menuItem}
                    activeClassName={styles.menuItemActive}
                  >
                    <i className={`icon ion-md-cash ${styles.customIcon}`} />
                    &nbsp;
                    <div
                      style={{ display: 'inline' }}
                      className={styles.menuText}
                    >
                      CPL Credits
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/alterations"
                    exact
                    className={styles.menuItem}
                    activeClassName={styles.menuItemActive}
                  >
                    <i
                      className={`icon ion-md-construct ${styles.customIcon}`}
                    />
                    &nbsp;
                    <div
                      style={{ display: 'inline' }}
                      className={styles.menuText}
                    >
                      Alterations
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/compensations"
                    exact
                    className={styles.menuItem}
                    activeClassName={styles.menuItemActive}
                  >
                    <i className={`icon ion-md-repeat ${styles.customIcon}`} />
                    &nbsp;
                    <div
                      style={{ display: 'inline' }}
                      className={styles.menuText}
                    >
                      Compensations
                    </div>
                  </NavLink>
                  <header className={styles.menuHeader}>Admin Options</header>
                  <NavLink
                    to="/dashboard/add-staff"
                    exact
                    className={styles.menuItem}
                    activeClassName={styles.menuItemActive}
                  >
                    <i
                      className={`icon ion-md-person-add ${styles.customIcon}`}
                    />
                    &nbsp;
                    <div
                      style={{ display: 'inline' }}
                      className={styles.menuText}
                    >
                      Add Staff
                    </div>
                  </NavLink>
                  <header className={styles.menuHeader}>Holidays</header>
                  <NavLink
                    to="/dashboard/view-holidays"
                    exact
                    className={styles.menuItem}
                    activeClassName={styles.menuItemActive}
                  >
                    <i className={`icon ion-md-eye ${styles.customIcon}`} />
                    &nbsp;
                    <div
                      style={{ display: 'inline' }}
                      className={styles.menuText}
                    >
                      Public Holidays
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/view-holidays"
                    exact
                    className={styles.menuItem}
                    activeClassName={styles.menuItemActive}
                  >
                    <i className={`icon ion-md-eye-off ${styles.customIcon}`} />
                    &nbsp;
                    <div
                      style={{ display: 'inline' }}
                      className={styles.menuText}
                    >
                      Restricted Holidays
                    </div>
                  </NavLink>
                  <header className={styles.menuHeader}>Reports</header>
                  <NavLink
                    exact
                    to="/"
                    className={styles.menuItem}
                    activeClassName={styles.menuItemActive}
                  >
                    <i className={`icon ion-md-stats ${styles.customIcon}`} />
                    &nbsp;
                    <div
                      style={{ display: 'inline' }}
                      className={styles.menuText}
                    >
                      View Reports
                    </div>
                  </NavLink>
                  {/* <div className={styles.seperator} /> */}
                  {/* <header className={styles.menuHeader}>
                    Notifications - ({0})
                  </header> */}
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
                className={settingsIconSelector.join(' ')}
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
        <div
          className={`${styles.popouts} ${
            styles.popout
          } ${settingsMenuStyles.join(' ')}`}
        >
          <div className={styles.item}>
            <i
              className={`icon ion-md-build ${styles.menuIcon}`}
              title="Update Profile"
            />
            Update Profile
          </div>
          <div className={styles.item}>
            <i
              className={`icon ion-md-lock ${styles.menuIcon}`}
              title="Change Password"
            />
            Change Password
          </div>
          {/* <div className={styles.seperator2} /> */}
          <div className={`${styles.item} ${styles.danger}`}>
            <i
              className={`icon ion-md-close ${styles.menuIcon}`}
              title="Logout"
            />
            Logout
          </div>
        </div>
      </div>
    );
  }
}

export default Sidenav;
