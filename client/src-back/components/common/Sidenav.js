import React, { Component } from 'react';
import styles from './Sidenav.module.css';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import { showLogoutPopup } from '../../actions/utilActions';
import { ReactComponent as MdEasel } from '../../assets/icons/md-easel.svg';
import { ReactComponent as MdAdd } from '../../assets/icons/md-add.svg';
import { ReactComponent as MdCalendar } from '../../assets/icons/md-calendar.svg';
import { ReactComponent as MdCash } from '../../assets/icons/md-cash.svg';
import { ReactComponent as MdCheckboxOutline } from '../../assets/icons/md-checkbox-outline.svg';
import { ReactComponent as MdClipboard } from '../../assets/icons/md-clipboard.svg';
import { ReactComponent as MdConstruct } from '../../assets/icons/md-construct.svg';
import { ReactComponent as MdContact } from '../../assets/icons/md-contact.svg';
import { ReactComponent as MdCube } from '../../assets/icons/md-cube.svg';
import { ReactComponent as MdEyeOff } from '../../assets/icons/md-eye-off.svg';
import { ReactComponent as MdEye } from '../../assets/icons/md-eye.svg';
import { ReactComponent as MdKey } from '../../assets/icons/md-key.svg';
import { ReactComponent as MdListBox } from '../../assets/icons/md-list-box.svg';
import { ReactComponent as MdPersonAdd } from '../../assets/icons/md-person-add.svg';
import { ReactComponent as MdRepeat } from '../../assets/icons/md-repeat.svg';
import { ReactComponent as MdSchool } from '../../assets/icons/md-school.svg';
import { ReactComponent as MdStats } from '../../assets/icons/md-stats.svg';
import { ReactComponent as MdToday } from '../../assets/icons/md-today.svg';
import { ReactComponent as LogoGithub } from '../../assets/icons/logo-github.svg';
import { ReactComponent as MdSunny } from '../../assets/icons/md-sunny.svg';
import { ReactComponent as MdMoon } from '../../assets/icons/md-moon.svg';
import { ReactComponent as MdSettings } from '../../assets/icons/md-settings.svg';
import { ReactComponent as MdCloseCircle } from '../../assets/icons/md-close-circle.svg';
import { ReactComponent as MdBack } from '../../assets/icons/md-arrow-back.svg';
import { ReactComponent as MdBuild } from '../../assets/icons/md-build.svg';

class Sidenav extends Component {
  state = {
    isSettingsMenuVisible: false
  };

  settingsMenuClickHandler = event => {
    this.setState({ isSettingsMenuVisible: !this.state.isSettingsMenuVisible });
  };

  componentWillReceiveProps = nextprops => {
    this.setState({
      ...this.state,
      isSettingsMenuVisible: nextprops.isSettingsMenuVisible
    });
  };

  logoutHandler = event => {
    event.preventDefault();
    this.props.logoutPopupHandler();
    this.setState({ isSettingsMenuVisible: false });
    if (this.props.isVisible) this.props.sideNavToggle();
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
    const isVisible = this.props.isVisible;

    let adminLinks = (
      <span>
        <NavLink
          exact
          to="/dashboard"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdEasel className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Dashboard
          </div>
        </NavLink>
        {/* <div className={styles.seperator} /> */}
        <header className={styles.menuHeader}>Manage</header>
        <NavLink
          exact
          to="/dashboard/add-staff"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdPersonAdd className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add Staff
          </div>
        </NavLink>
        <NavLink
          exact
          to="/dashboard/add-admin"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdKey className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add Privileged Account
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/add-course"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdSchool className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add Course
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/add-class"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdCube className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add Class
          </div>
        </NavLink>
        <header className={styles.menuHeader}>Leave</header>
        <NavLink
          to="/dashboard/leave-allocation"
          exact
          title="Leave Allocation"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdToday className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Leave Allocation
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/leave-type"
          exact
          title="Leave Allocation"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdToday className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Leave Types
          </div>
        </NavLink>
        <header className={styles.menuHeader}>Timetable</header>
        <NavLink
          to="/dashboard/timetable"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdAdd className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add/Update Timetable
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/add-class"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdEye className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            View Timetable
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/add-class"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdClipboard className={styles.customIconTest} />
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
          activeClassName={styles.menuItemActive}>
          <MdCalendar className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Add Holidays
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/view-holidays"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdListBox className={styles.customIconTest} />
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
          activeClassName={styles.menuItemActive}>
          <MdStats className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            View Reports
          </div>
          <div
            className={`${styles.menuNotification} ${
              styles.menuNotificationOrange
            }`}>
            NEW
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
          activeClassName={styles.menuItemActive}>
          <MdEasel className={styles.customIconTest} />
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
          activeClassName={styles.menuItemActive}>
          <MdListBox className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Apply for Leave
          </div>
          <div
            className={`${styles.menuNotification} ${
              styles.menuNotificationOrange
            }`}>
            NEW
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/leave-status"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdCheckboxOutline className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Leave Status
          </div>
          <div className={`${styles.menuNotification}`}>1</div>
        </NavLink>
        <NavLink
          to="/dashboard/cpl-credits"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdCash className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            CPL Credits
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/alterations"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdConstruct className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Alterations
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/compensations"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdRepeat className={styles.customIconTest} />
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
          activeClassName={styles.menuItemActive}>
          <MdEye className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            Public Holidays
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/view-holidays"
          exact
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdEyeOff className={styles.customIconTest} />
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
          activeClassName={styles.menuItemActive}>
          <MdStats className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            View Reports
          </div>
        </NavLink>
        <NavLink
          exact
          to="/"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdStats className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            View Reports
          </div>
        </NavLink>
        <NavLink
          exact
          to="/"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdStats className={styles.customIconTest} />
          &nbsp;
          <div style={{ display: 'inline' }} className={styles.menuText}>
            View Reports
          </div>
        </NavLink>
        <NavLink
          exact
          to="/"
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdStats className={styles.customIconTest} />
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

    let tempStyles = [];
    tempStyles.push(styles.sideNavWrapper);
    if (isVisible) {
      tempStyles.push(styles.sideNavVisible);
    }

    return (
      <div
        className={tempStyles.join(' ')}
        style={{ height: '100%', overflow: 'hidden' }}>
        <div className={styles.sideNav}>
          <div className={styles.menu}>
            <div className={styles.logo}>
              <Link title="Leave Management System" to="/">
                LMS
              </Link>
              <div className={styles.menuText}>
                {`v${process.env.REACT_APP_VERSION}`}
              </div>
              <div className={styles.customHeaderIcons}>
                <div className={`${styles.iconWrapper} ${styles.closeNavIcon}`}>
                  <MdBack
                    onClick={this.props.sideNavToggle}
                    className={styles.customHeaderIconTest}
                  />
                </div>
                <div className={styles.iconWrapper}>
                  <a
                    title="GitHub repo"
                    href="https://github.com/arkn98/lms"
                    target="_blank"
                    rel="noopener noreferrer">
                    <LogoGithub className={styles.customHeaderIconTest} />
                  </a>
                </div>
                {/* <div className={styles.iconWrapper}>
                  <Link to="/">
                    <MdInformationCircle
                      className={styles.customHeaderIconTest}
                    />
                  </Link>
                </div> */}
              </div>
            </div>
            <div className={styles.scrollMenuWrapper}>
              <div className={styles.scroller}>{links}</div>
            </div>
          </div>
          <div className={styles.userContainer}>
            <div className={styles.userAvatar}>
              <MdContact className={styles.customIconTest} />
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
                ref={this.props.setMenuRef}
                className={`${styles.popouts} ${
                  styles.popout
                } ${settingsMenuStyles.join(' ')}`}>
                <div
                  className={styles.item}
                  onClick={this.props.themeChangeHandler}>
                  {this.props.isDarkTheme ? (
                    <React.Fragment>
                      <MdSunny className={styles.menuIconTest} />
                      Switch to Light theme
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <MdMoon className={styles.menuIconTest} />
                      Switch to Dark Theme
                    </React.Fragment>
                  )}
                </div>
                <Link to="/dashboard/settings" className={styles.item}>
                  <MdBuild className={styles.menuIconTest} />
                  Account Settings
                </Link>
                <div className={styles.seperator2} />
                <div
                  onClick={this.logoutHandler}
                  className={`${styles.item} ${styles.danger}`}>
                  <MdCloseCircle className={styles.menuIconTest} />
                  Logout
                </div>
              </div>
              <div
                className={settingsIconSelector.join(' ')}
                onClick={this.settingsMenuClickHandler}>
                <MdSettings className={styles.customIconTest} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sidenav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  showLogoutPopup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, showLogoutPopup },
  null,
  {
    pure: false
  }
)(Sidenav);
