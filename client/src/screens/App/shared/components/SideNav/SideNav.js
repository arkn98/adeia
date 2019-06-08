import React, { Component } from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import styles from './SideNav.module.scss';
import {
  MdSettings,
  LogoGithub,
  MdBack,
  MdContact,
  MdEasel,
  MdPersonAdd,
  MdKey,
  MdCreate,
  MdSchool,
  MdCube,
  MdList,
  MdPartlySunny,
  MdCalendar,
  MdBusiness,
  MdSwap,
  MdSend,
  MdGitNetwork,
  MdCodeWorking,
  MdCheckboxOutline
} from 'assets/icons';
import { SettingsMenuSideNav as SettingsMenu } from '../../common/SettingsMenu';
import { Tooltip } from '../../common/Tooltip';
import ClickOutside from 'react-click-outside';
import { accountTypes } from 'data';

export const LooseNavLink = props => (
  <NavLink
    {...props}
    isActive={(match, location) => {
      let index = location.pathname.indexOf(props.to);
      return location.pathname.startsWith(props.to)
        ? location.pathname.length > props.to.length
          ? location.pathname.indexOf('/', index + props.to.length) > -1
          : true
        : false;
    }}
  />
);

const SettingsMenuWithIcon = props => {
  return (
    <ClickOutside onClickOutside={() => props.settingsMenuHide()}>
      <div className={styles.userSettings}>
        <SettingsMenu {...props} />
        <Tooltip content="User Settings" placement="top">
          <div
            className={`${styles.iconSelector} ${
              props.isSettingsMenuVisible ? styles.iconSelectorHovered : null
            }`}
            onClick={() => props.settingsMenuToggle()}>
            <MdSettings className={styles.customIconTest} />
          </div>
        </Tooltip>
      </div>
    </ClickOutside>
  );
};

const WrappedSettingsMenu = SettingsMenuWithIcon;

class SideNav extends Component {
  state = {
    isDarkTheme: false
  };

  themeChangeHandler = event => {
    event.preventDefault();
    this.setState(
      { ...this.state, isDarkTheme: !this.state.isDarkTheme },
      () => {
        this.props.changeTheme(this.props.isDarkTheme);
      }
    );
  };

  logoutHandler = () => {
    this.props.settingsMenuHide();
    this.props.sideNavHide();
    this.props.showPopout({
      type: 'logout',
      title: 'Log Out?',
      message: 'Are you sure you want to log out?',
      buttonOrder: ['danger', 'link'], //from right to left
      buttonContent: ['Logout', 'Cancel'],
      buttonAction: ['action1', 'dismiss']
    });
  };

  render = () => {
    const { isSideNavVisible, sideNavHide, profile } = this.props;
    let settingsMenuStyles = [];
    let settingsIconSelector = [];
    settingsMenuStyles.push(styles.settingsMenu);
    settingsIconSelector.push(styles.iconSelector);
    if (this.props.isSettingsMenuVisible) {
      settingsIconSelector.push(styles.iconSelectorHovered);
      settingsMenuStyles.push(styles.settingsMenuVisible);
    }

    let links = [];
    links.push(
      <NavLink
        exact
        to="/dashboard"
        onClick={() => sideNavHide()}
        className={styles.menuItem}
        activeClassName={styles.menuItemActive}>
        <MdEasel className={styles.customIconTest} />{' '}
        <div className={styles.menuText}>Dashboard</div>
      </NavLink>
    );
    if (this.props.auth.user.accountType === accountTypes.ADMIN) {
      links.push(<div className={styles.seperator} />);
      links.push(<div className={styles.menuHeader}>Leave Settings</div>);
      links.push(
        <LooseNavLink
          to="/dashboard/leave"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdList className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Leave List</div>
          <div
            className={`${styles.menuNotification} ${
              styles.menuNotificationRed
            }`}>
            NEW
          </div>
        </LooseNavLink>
      );
      links.push(
        <LooseNavLink
          to="/dashboard/leave-action"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdCheckboxOutline className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Leaves requiring action</div>
          <div
            className={`${styles.menuNotification} ${
              styles.menuNotificationOrange
            }`}>
            UPDATE
          </div>
        </LooseNavLink>
      );
      links.push(
        <LooseNavLink
          to="/dashboard/alteration"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdSwap className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Alteration List</div>
        </LooseNavLink>
      );
      links.push(
        <NavLink
          exact
          to="/dashboard/leave-allocation"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdGitNetwork className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Leave Allocation</div>
        </NavLink>
      );
      links.push(
        <NavLink
          exact
          to="/dashboard/leave-type"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdPersonAdd className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Manage Leave Types</div>
        </NavLink>
      );
      links.push(
        <NavLink
          exact
          to="/dashboard/holiday"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdPartlySunny className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Holiday Settings</div>
        </NavLink>
      );
      links.push(<div className={styles.seperator} />);
      links.push(<div className={styles.menuHeader}>Account Settings</div>);
      links.push(
        <NavLink
          exact
          to="/dashboard/staff/add"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdPersonAdd className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Add Staff Account</div>
        </NavLink>
      );
      links.push(
        <NavLink
          exact
          to="/dashboard/staff/edit"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdCreate className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Edit Staff Account</div>
        </NavLink>
      );
      links.push(
        <NavLink
          exact
          to="/dashboard/priv-account/add"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdKey className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Add Privileged Account</div>
        </NavLink>
      );
      links.push(
        <NavLink
          exact
          to="/dashboard/priv-account/edit"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdCreate className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Edit Privileged Account</div>
        </NavLink>
      );
      links.push(<div className={styles.seperator} />);
      links.push(<div className={styles.menuHeader}>Timetable Settings</div>);
      links.push(
        <NavLink
          exact
          to="/dashboard/timetable"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdCalendar className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Timetable</div>
        </NavLink>
      );
      links.push(
        <NavLink
          exact
          to="/dashboard/class"
          className={styles.menuItem}
          onClick={() => sideNavHide()}
          activeClassName={styles.menuItemActive}>
          <MdCube className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Class Settings</div>
        </NavLink>
      );
      links.push(
        <NavLink
          exact
          to="/dashboard/class-group"
          className={styles.menuItem}
          onClick={() => sideNavHide()}
          activeClassName={styles.menuItemActive}>
          <MdBusiness className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Class group Settings</div>
        </NavLink>
      );
      links.push(
        <NavLink
          exact
          to="/dashboard/course"
          className={styles.menuItem}
          onClick={() => sideNavHide()}
          activeClassName={styles.menuItemActive}>
          <MdSchool className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Course Settings</div>
        </NavLink>
      );
      links.push(<div className={styles.seperator} />);
      links.push(<div className={styles.menuHeader}>Misc. Settings</div>);
      /* links.push(
        <NavLink
          exact
          to="/dashboard/course"
          className={styles.menuItem}
          onClick={() => sideNavHide()}
          activeClassName={styles.menuItemActive}>
          <MdSchool className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Course Settings</div>
        </NavLink>
      ); */
    } else if (this.props.auth.user.accountType === accountTypes.OFFICE) {
    } else {
      links.push(<div className={styles.seperator} />);
      links.push(<div className={styles.menuHeader}>Manage Leaves</div>);
      links.push(
        <NavLink
          exact
          to="/dashboard/leave-apply"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdSend className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Leave Application</div>
        </NavLink>
      );
      links.push(
        <LooseNavLink
          exact
          to="/dashboard/leave"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdList className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Leave List</div>
        </LooseNavLink>
      );
      links.push(
        <LooseNavLink
          to="/dashboard/alteration"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdSwap className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Alterations for me</div>
        </LooseNavLink>
      );
      links.push(
        <NavLink
          exact
          to="/dashboard/holiday/public"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdPartlySunny className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Public Holidays</div>
        </NavLink>
      );
      links.push(
        <NavLink
          exact
          to="/dashboard/holiday/restricted"
          onClick={() => sideNavHide()}
          className={styles.menuItem}
          activeClassName={styles.menuItemActive}>
          <MdCalendar className={styles.customIconTest} />{' '}
          <div className={styles.menuText}>Restricted Holidays</div>
        </NavLink>
      );
    }

    return (
      <div
        className={`${styles.sideNavWrapper} ${
          isSideNavVisible ? styles.sideNavVisible : null
        }`}>
        <div className={styles.sideNav}>
          <div className={styles.topContainer}>
            <div className={styles.topBar}>
              <Tooltip content="Home" placement="bottom">
                <div className={styles.logo}>
                  <Link to="/">LMS</Link>
                </div>
              </Tooltip>
              <div className={styles.version}>
                {`v${process.env.REACT_APP_VERSION}`}
              </div>
              <div className={styles.topBarIcons}>
                <div
                  className={`${styles.topBarIconWrapper} ${
                    styles.mobileVisible
                  }`}
                  onClick={() => this.props.sideNavHide()}>
                  <MdBack className={styles.topBarIcon} />
                </div>
                <div className={styles.topBarIconWrapper}>
                  <Tooltip content="GitHub repo" placement="bottom">
                    <a
                      href="https://github.com/arkn98/leave-management-system"
                      target="_blank"
                      rel="noopener noreferrer">
                      <LogoGithub className={styles.topBarIcon} />
                    </a>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className={styles.scrollMenuWrapper}>
              <div className={styles.scroller}>
                <span>{links}</span>
              </div>
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
            <WrappedSettingsMenu
              logoutHandler={this.logoutHandler}
              settingsMenuHide={this.props.settingsMenuHide}
              settingsMenuToggle={this.props.settingsMenuToggle}
              isSettingsMenuVisible={this.props.isSettingsMenuVisible}
              isDarkTheme={this.props.isDarkTheme}
              themeChangeHandler={this.themeChangeHandler}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default withRouter(SideNav);
