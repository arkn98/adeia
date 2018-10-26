import React, { Component } from 'react';
import styles from './Dashboard.module.css';
import Sidenav from './components/Sidenav';
import { Switch, Route, withRouter } from 'react-router-dom';
import Main from './components/Main';
import LeaveApplication from './components/LeaveApplication';
import notificationStyles from './components/notificationStyles.module.css';
import ViewHolidays from './components/ViewHolidays';
import PropTypes from 'prop-types';
import AddStaff from './components/AddStaff';
import AddAdmin from './components/AddAdmin';
import { connect } from 'react-redux';
import {
  hideLogoutPopup,
  changeTheme,
  showLogoutPopup
} from './actions/utilActions';
import { logoutUser } from './actions/authActions';
import {
  clearCurrentProfile,
  getCurrentProfile
} from './actions/profileActions';
import Modal from './components/Modal';

class Dashboard extends Component {
  state = {
    mouseX: 0,
    mouseY: 0,
    isNotificationsVisible: false,
    pageTitle: 'Dashboard'
  };

  logoutPopupHandler = () => {
    this.props.showLogoutPopup();
  };

  routeChangeHandler = pageTitle => {
    if (this.state.pageTitle !== pageTitle)
      this.setState({ ...this.state, pageTitle });
  };

  modalDismissHandler = event => {
    event.preventDefault();
    this.props.hideLogoutPopup();
  };

  modalConfirmHandler = event => {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.hideLogoutPopup();
    this.props.logoutUser();
  };

  notificationsClickHandler = event => {
    this.setState({
      isNotificationsVisible: !this.state.isNotificationsVisible
    });
  };

  themeChangeHandler = event => {
    this.props.changeTheme(this.props.utils.isDarkTheme);
  };

  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  modals = null;

  render() {
    let settingsMenuStyles = [];
    let settingsIconSelector = [];
    settingsMenuStyles.push(notificationStyles.settingsMenu);
    settingsIconSelector.push(notificationStyles.iconSelector);
    if (this.state.isNotificationsVisible) {
      settingsIconSelector.push(notificationStyles.iconSelectorHovered);
      settingsMenuStyles.push(notificationStyles.settingsMenuVisible);
    }

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { isLogoutModalVisible, isDarkTheme } = this.props.utils;

    let notifCount;
    if (!loading) {
      //notifCount = profile.notifications.length;
      //notifCount = null;
      notifCount = 10;
    } else {
      notifCount = null;
    }

    if (isLogoutModalVisible) {
      this.modals = (
        <div className={notificationStyles.poputs}>
          <div
            className={styles.backdrop}
            style={{
              opacity: '0.85',
              backgroundColor: '#000',
              zIndex: '1000',
              transform: 'translateZ(0px)'
            }}
          />
          <Modal
            isDarkTheme={isDarkTheme}
            modalConfirmHandler={this.modalConfirmHandler}
            modalDismissHandler={this.modalDismissHandler}
          />
        </div>
      );
    } else {
      this.modals = null;
    }

    let rootStyles = [];
    rootStyles.push(styles.dashMount);

    //if (!isDarkTheme) rootStyles.push('lightTheme');
    if (!isDarkTheme) settingsMenuStyles.push(notificationStyles.lightTheme);

    return (
      <div style={{ height: '100%' }}>
        <div className={rootStyles.join(' ')}>
          <div className={styles.sideNavWrapper}>
            <Sidenav
              isDarkTheme={isDarkTheme}
              routeChangeHandler={this.routeChangeHandler}
              themeChangeHandler={this.themeChangeHandler}
              logoutPopupHandler={this.logoutPopupHandler}
            />
          </div>
          <div className={styles.mainWrapper}>
            <div
              className={isDarkTheme ? null : styles.lightTheme}
              style={{ height: '100%' }}>
              <div className={styles.main}>
                <div className={styles.topBarWrapper}>
                  <div className={styles.topBar}>
                    <div className={styles.pageTitle}>
                      {this.state.pageTitle}
                    </div>
                    <div className={styles.headerIcons}>
                      {/*<div className={styles.searchBarWrapper}>
                          <div className={styles.searchBar}>
                            <div className={styles.search} />
                          </div>
                        </div>
                      <div className={styles.seperator} /> */}
                      <div
                        onClick={this.notificationsClickHandler}
                        className={styles.iconWrapper}
                        style={{ position: 'relative' }}>
                        <i
                          className={`icon ion-md-notifications ${
                            styles.customHeaderIcon
                          }`}
                        />
                        {notifCount !== 0 && notifCount !== null ? (
                          <div
                            className={`${notificationStyles.badgeWrapper} ${
                              notificationStyles.badge
                            }`}
                            style={
                              notifCount > 9
                                ? { right: '-2px' }
                                : { right: '+2px' }
                            }>
                            {notifCount}
                          </div>
                        ) : null}
                      </div>
                      <div className={styles.iconWrapper}>
                        <a
                          title="GitHub Repo"
                          href="https://github.com/arkn98/lms"
                          target="_blank"
                          rel="noopener noreferrer">
                          <i
                            className={`icon ion-md-help-circle ${
                              styles.customHeaderIcon
                            }`}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <Switch>
                  <Route
                    path="/dashboard/apply"
                    exact
                    render={() => (
                      <LeaveApplication
                        notificationsClickHandler={
                          this.notificationsClickHandler
                        }
                        notifCount={notifCount}
                        isDarkTheme={isDarkTheme}
                      />
                    )}
                  />
                  <Route
                    path="/dashboard/view-holidays"
                    exact
                    component={ViewHolidays}
                    notifCount={notifCount}
                    isDarkTheme={isDarkTheme}
                  />
                  <Route
                    path="/dashboard/add-staff"
                    exact
                    render={() => (
                      <AddStaff
                        notificationsClickHandler={
                          this.notificationsClickHandler
                        }
                        notifCount={notifCount}
                        isDarkTheme={isDarkTheme}
                      />
                    )}
                  />
                  <Route
                    path="/dashboard/add-admin"
                    exact
                    component={AddAdmin}
                    isDarkTheme={isDarkTheme}
                    notifCount={notifCount}
                  />
                  <Route
                    path="/dashboard"
                    exact
                    render={() => (
                      <Main
                        notificationsClickHandler={
                          this.notificationsClickHandler
                        }
                        notifCount={notifCount}
                        isDarkTheme={isDarkTheme}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${notificationStyles.popouts}
          ${notificationStyles.popout}
          ${notificationStyles.notifications}
          ${settingsMenuStyles.join(' ')}`}>
          <div
            className={notificationStyles.notifHeader}
            style={{ paddingBottom: '0' }}>
            <div className={notificationStyles.title}>
              Notifications - {notifCount}
            </div>
            <div className={notificationStyles.notifHeaderTabWrapper}>
              <div className={notificationStyles.tabBar}>
                <div
                  role="button"
                  className={`${notificationStyles.tabBarItem} ${
                    notificationStyles.tabBarItemSelected
                  }`}>
                  All Servers
                </div>
                <div role="button" className={notificationStyles.tabBarItem}>
                  This Server
                </div>
              </div>
              <div className={notificationStyles.mentionFilter}>
                <div className={notificationStyles.label}>Display:</div>
                <div className={notificationStyles.value}>Everything</div>
              </div>
            </div>
          </div>
          <div className={notificationStyles.scrollWrap}>
            <div className={notificationStyles.scroller}>
              <div className={notificationStyles.channelSeperator}>
                <span className={notificationStyles.channelName}>#general</span>
                <span className={notificationStyles.guildName}>Arkane</span>
              </div>
              <div className={notificationStyles.msgGroupWrapper}>
                <div className={notificationStyles.msgGroup}>
                  <div className={notificationStyles.msgContainer}>
                    <div className={notificationStyles.msg}>
                      <div className={notificationStyles.msgHeader} />
                      <div className={notificationStyles.msgContent} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={notificationStyles.scrollBar} />
          </div>
        </div>
        {this.modals}
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  utils: PropTypes.object.isRequired,
  hideLogoutPopup: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
  showLogoutPopup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  utils: state.utils
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    hideLogoutPopup,
    clearCurrentProfile,
    logoutUser,
    changeTheme,
    showLogoutPopup
  }
)(withRouter(Dashboard));
