import React, { Component } from 'react';
import styles from './Sidenav.module.css';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { clearCurrentProfile } from '../actions/profileActions';

class Sidenav extends Component {
  state = {
    isSettingsMenuVisible: false
  };

  settingsMenuClickHandler = event => {
    this.setState({ isSettingsMenuVisible: !this.state.isSettingsMenuVisible });
  };

  logoutHandler = event => {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
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

    const { user } = this.props.auth;

    const adminLinks = (
      <span>
        <NavLink
          to="/dashboard"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-easel ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Dashboard
          </div>
        </NavLink>
        {/* <div className={styles.seperator} /> */}
        <header className={styles.menuHeader}>Manage</header>
        <NavLink
          to="/dashboard/add-staff"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-person-add ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add Staff
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/add-admin"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-key ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add Privileged Account
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/add-course"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-school ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add Course
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/add-class"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-cube ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add Class
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/leave-allocation"
          exact
          title="Leave Allocation"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-today ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Leave Allocation
          </div>
        </NavLink>
        <header className={styles.menuHeader}>Timetable</header>
        <NavLink
          to="/dashboard/add-class"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-add ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add Timetable
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/add-class"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-eye ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            View Timetable
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/add-class"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-clipboard ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Lab Allocation
          </div>
        </NavLink>
        <header className={styles.menuHeader}>Holidays</header>
        <NavLink
          to="/dashboard/add-holidays"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-calendar ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add Holidays
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/view-holidays"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-list-box ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            View Holidays
          </div>
        </NavLink>
        <header className={styles.menuHeader}>Reports</header>
        <NavLink
          exact
          to="/dashboard/reports"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-stats ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            View Reports
          </div>
        </NavLink>
      </span>
    );
    const staffLinks = (
      <span>
        <NavLink
          to="/dashboard"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-easel ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Dashboard
          </div>
        </NavLink>
        <header className={styles.menuHeader}>Leaves</header>
        <NavLink
          to="/dashboard/apply"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-list-box ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Apply for Leave
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/leave-status"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-checkbox-outline ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
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
          <div style={{ display: 'inline' }} className={styles.menuText}>
            CPL Credits
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/alterations"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}
        >
          <i className={`icon ion-md-construct ${styles.customIcon}`} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
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
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Compensations
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
          <div style={{ display: 'inline' }} className={styles.menuText}>
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
          <div style={{ display: 'inline' }} className={styles.menuText}>
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
          <div style={{ display: 'inline' }} className={styles.menuText}>
            View Reports
          </div>
        </NavLink>
      </span>
    );
    let links = null;
    if (user.accountType === 0) {
      links = adminLinks;
    } else if (user.accountType === 1 || user.accountType === 2) {
      links = staffLinks;
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
                {links}

                {/* <div className={styles.seperator} /> */}
                {/* <header className={styles.menuHeader}>
                    Notifications - ({0})
                  </header> */}
              </div>
            </div>
          </div>
          <div className={styles.userContainer}>
            <div className={styles.userAvatar}>
              <i className={`icon ion-md-contact ${styles.customIcon}`} />
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>
                {this.props.auth.user.name}
              </span>
              <span className={styles.userClass}>
                Staff ID: {this.props.auth.user.staffId}
              </span>
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
          <div
            onClick={this.logoutHandler}
            className={`${styles.item} ${styles.danger}`}
          >
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

Sidenav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile },
  null,
  {
    pure: false
  }
)(Sidenav);
