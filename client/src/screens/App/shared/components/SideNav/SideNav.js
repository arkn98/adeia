import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './SideNav.module.scss';
import { MdSettings, LogoGithub, MdBack, MdContact } from 'assets/icons';
import { SettingsMenuSideNav as SettingsMenu } from '../../common/SettingsMenu';
import ClickOutside from 'react-click-outside';

const SettingsMenuWithIcon = props => {
  return (
    <ClickOutside onClickOutside={() => props.settingsMenuHide()}>
      <div className={styles.userSettings}>
        <SettingsMenu {...props} />
        <div
          className={`${styles.iconSelector} ${
            props.isSettingsMenuVisible ? styles.iconSelectorHovered : null
          }`}
          onClick={() => props.settingsMenuToggle()}>
          <MdSettings className={styles.customIconTest} />
        </div>
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
    const { isSideNavVisible } = this.props;
    let settingsMenuStyles = [];
    let settingsIconSelector = [];
    settingsMenuStyles.push(styles.settingsMenu);
    settingsIconSelector.push(styles.iconSelector);
    if (this.props.isSettingsMenuVisible) {
      settingsIconSelector.push(styles.iconSelectorHovered);
      settingsMenuStyles.push(styles.settingsMenuVisible);
    }

    return (
      <div
        className={`${styles.sideNavWrapper} ${
          isSideNavVisible ? styles.sideNavVisible : null
        }`}>
        <div className={styles.sideNav}>
          <div className={styles.topContainer}>
            <div className={styles.topBar}>
              <div className={styles.logo}>
                <Link title="Leave Management System" to="/">
                  LMS
                </Link>
              </div>
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
                  <a
                    title="GitHub repo"
                    href="https://github.com/arkn98/lms"
                    target="_blank"
                    rel="noopener noreferrer">
                    <LogoGithub className={styles.topBarIcon} />
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.scrollMenuWrapper}>
              <div className={styles.scroller}>{/*links*/}abcd</div>
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
