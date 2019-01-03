import React, { Component } from 'react';
import styles from './Dashboard.module.css';
import Sidenav from './components/common/Sidenav';
import { Switch, Route, withRouter } from 'react-router-dom';
import Main from './components/Main';
import LeaveApplication from './components/LeaveApplication';
import notificationStyles from './components/notificationStyles.module.css';
import ViewHolidays from './components/ViewHolidays';
import PropTypes from 'prop-types';
import AddStaff from './components/AddStaff';
import AddAdmin from './components/AddAdmin';
import AddClass from './components/AddClass';
import AddCourse from './components/AddCourse';
import Timetable from './components/Timetable';
import { ReactComponent as MdNotifications } from './assets/icons/md-notifications.svg';
import { ReactComponent as MdMenu } from './assets/icons/md-menu.svg';
import { ReactComponent as EmptyNotifDark } from './assets/empty-mentions-dark.svg';
import { ReactComponent as EmptyNotifLight } from './assets/empty-mentions-light.svg';
import { ReactComponent as MdInformationCircle } from './assets/icons/md-information-circle.svg';
import { connect } from 'react-redux';
import {
  changeTheme,
  showLogoutPopup,
  hideLogoutPopup
} from './actions/utilActions';
import { logoutUser } from './actions/authActions';
import {
  clearCurrentProfile,
  getCurrentProfile
} from './actions/profileActions';
import {
  getAllClasses,
  getAllCourses,
  getAllStaff
} from './actions/timetableActions';
import LogoutModal from './components/common/LogoutModal';
import Modal from './components/common/Modal';
import PageNotFound from './PageNotFound';
import Spinner from './components/common/Spinner';

class Dashboard extends Component {
  state = {
    isNotificationsVisible: false,
    isSideNavVisible: false,
    isInfoModalVisible: false,
    isLogoutModalVisible: false
  };

  componentWillMount = () => {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({
        ...this.state,
        isSideNavVisible: false,
        isNotificationsVisible: false
      });
    });
  };

  componentWillUnmount = () => {
    this.unlisten();
  };

  logoutPopupHandler = () => {
    this.props.showLogoutPopup();
    //this.setState({ ...this.state, isLogoutModalVisible: true });
  };

  infoPopupHandler = event => {
    event.preventDefault();
    //this.props.showInfoPopup();
    this.setState({
      ...this.state,
      isInfoModalVisible: true
    });
  };

  infoPopupDismissHandler = event => {
    event.preventDefault();
    //this.props.hideInfoPopup();
    this.setState({ ...this.state, isInfoModalVisible: false });
  };

  modalDismissHandler = event => {
    event.preventDefault();
    this.props.hideLogoutPopup();
    //this.setState({ ...this.state, isLogoutModalVisible: false });
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
    setTimeout(() => {
      this.props.getCurrentProfile(false);
    }, 500);
    this.props.getAllClasses();
    this.props.getAllCourses();
    this.props.getAllStaff();
  };

  modals = null;

  sideNavToggle = () => {
    this.setState({
      ...this.state,
      isSideNavVisible: !this.state.isSideNavVisible
    });
  };

  render() {
    let settingsMenuStyles = [];
    let settingsIconSelector = [];
    settingsMenuStyles.push(notificationStyles.settingsMenu);
    settingsIconSelector.push(notificationStyles.iconSelector);
    if (this.state.isNotificationsVisible) {
      settingsIconSelector.push(notificationStyles.iconSelectorHovered);
      settingsMenuStyles.push(notificationStyles.settingsMenuVisible);
    }

    //const { user } = this.props.auth;
    //const { profile, loading } = this.props.profile;
    const { loading, profile } = this.props.profile;
    const { isLogoutModalVisible, isDarkTheme } = this.props.utils;

    let notifCount;
    if (
      !loading &&
      profile !== null &&
      typeof profile.notifications !== 'undefined'
    ) {
      notifCount = profile.notifications.length;
      //notifCount = null;
      //notifCount = '9+';
    } else {
      notifCount = null;
    }

    if (this.state.isInfoModalVisible) {
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
            modalTitle="About"
            modalDismissHandler={this.infoPopupDismissHandler}>
            fill in info here...
          </Modal>
        </div>
      );
    } else if (isLogoutModalVisible) {
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
          <LogoutModal
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

    //if (!isDarkTheme) rootStyles.push(styles.lightTheme);
    if (!isDarkTheme) settingsMenuStyles.push(notificationStyles.lightTheme);

    let routes = null;
    if (this.props.auth.user.accountType === 0) {
      routes = (
        <Switch>
          <Route
            path="/dashboard/view-holidays"
            exact
            component={ViewHolidays}
            isDarkTheme={isDarkTheme}
          />
          <Route
            path="/dashboard/timetable"
            exact
            render={() => (
              <Timetable
                newEntryHandler={this.newEntryHandler}
                editEntryHandler={this.editEntryHandler}
                notificationsClickHandler={this.notificationsClickHandler}
                isDarkTheme={isDarkTheme}
              />
            )}
          />
          <Route
            path="/dashboard/add-staff"
            exact
            render={() => (
              <AddStaff
                notificationsClickHandler={this.notificationsClickHandler}
                isDarkTheme={isDarkTheme}
              />
            )}
          />
          <Route
            path="/dashboard/add-class"
            exact
            render={() => (
              <AddClass
                notificationsClickHandler={this.notificationsClickHandler}
                isDarkTheme={isDarkTheme}
              />
            )}
          />
          <Route
            path="/dashboard/add-course"
            exact
            render={() => (
              <AddCourse
                notificationsClickHandler={this.notificationsClickHandler}
                isDarkTheme={isDarkTheme}
              />
            )}
          />
          <Route
            path="/dashboard/add-admin"
            exact
            render={() => (
              <AddAdmin
                notificationsClickHandler={this.notificationsClickHandler}
                isDarkTheme={isDarkTheme}
              />
            )}
          />
          <Route
            path="/dashboard"
            exact
            render={() => (
              <Main
                notificationsClickHandler={this.notificationsClickHandler}
                isDarkTheme={isDarkTheme}
              />
            )}
          />
          <Route render={() => <PageNotFound isDarkTheme={isDarkTheme} />} />
        </Switch>
      );
    } else if (this.props.auth.user.accountType === 1) {
      routes = (
        <Switch>
          <Route
            path="/dashboard/view-holidays"
            exact
            component={ViewHolidays}
            isDarkTheme={isDarkTheme}
          />
          <Route
            path="/dashboard"
            exact
            render={() => (
              <Main
                notificationsClickHandler={this.notificationsClickHandler}
                isDarkTheme={isDarkTheme}
              />
            )}
          />
          <Route render={() => <PageNotFound isDarkTheme={isDarkTheme} />} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route
            path="/dashboard/apply"
            exact
            render={() => (
              <LeaveApplication
                notificationsClickHandler={this.notificationsClickHandler}
                isDarkTheme={isDarkTheme}
              />
            )}
          />
          <Route
            path="/dashboard/view-holidays"
            exact
            component={ViewHolidays}
            isDarkTheme={isDarkTheme}
          />
          <Route
            path="/dashboard"
            exact
            render={() => (
              <Main
                notificationsClickHandler={this.notificationsClickHandler}
                isDarkTheme={isDarkTheme}
              />
            )}
          />
          <Route render={() => <PageNotFound isDarkTheme={isDarkTheme} />} />
        </Switch>
      );
    }

    let sideNavStyles = [];

    if (this.state.isSideNavVisible) {
      sideNavStyles.push(styles.sideNavVisible);
      sideNavStyles.push(styles.sideNavWrapper);
    } else {
      sideNavStyles.push(styles.sideNavWrapper);
    }

    return (
      <div style={{ height: '100%' }}>
        <div className={rootStyles.join(' ')}>
          <div className={sideNavStyles.join(' ')}>
            <Sidenav
              isDarkTheme={isDarkTheme}
              sideNavToggle={this.sideNavToggle}
              isVisible={this.state.isSideNavVisible}
              routeChangeHandler={this.routeChangeHandler}
              themeChangeHandler={this.themeChangeHandler}
              logoutPopupHandler={this.logoutPopupHandler}
            />
            {this.state.isSideNavVisible ? (
              <div
                onClick={this.sideNavToggle}
                className={styles.backdrop}
                style={{
                  opacity: '0.85',
                  backgroundColor: '#000',
                  zIndex: '998',
                  transform: 'translateZ(0px)'
                }}
              />
            ) : null}
          </div>
          <div className={styles.mainWrapper}>
            <div
              className={isDarkTheme ? null : styles.lightTheme}
              style={{ height: '100%' }}>
              <div className={styles.main}>
                <div className={styles.topBarWrapper}>
                  <div className={styles.topBar}>
                    <div style={{ display: 'flex' }}>
                      <MdMenu
                        onClick={this.sideNavToggle}
                        className={`${styles.customHeaderIcon} ${
                          styles.sideNavToggle
                        }`}
                      />
                      <div className={styles.pageTitle}>
                        {this.props.utils.currentPageTitle}
                      </div>
                    </div>
                    <div className={styles.headerIcons}>
                      <div className={styles.searchBarWrapper}>
                        <div className={styles.searchBar}>
                          <div className={styles.search} />
                        </div>
                      </div>
                      <div className={styles.seperator} />
                      <div
                        className={styles.iconWrapper}
                        style={{ position: 'relative' }}
                        title="Notifications">
                        <div
                          style={{
                            height: '100%',
                            overflowY: 'hidden'
                          }}
                          className={`${notificationStyles.popouts} ${
                            notificationStyles.popout
                          } ${
                            notificationStyles.notifications
                          } ${settingsMenuStyles.join(' ')}`}>
                          <div
                            className={notificationStyles.notifHeader}
                            style={{ paddingBottom: '0' }}>
                            <div className={notificationStyles.title}>
                              Notifications - {notifCount}
                            </div>
                            <div
                              className={
                                notificationStyles.notifHeaderTabWrapper
                              }>
                              <div className={notificationStyles.tabBar}>
                                <div
                                  role="button"
                                  className={`${
                                    notificationStyles.tabBarItem
                                  } ${notificationStyles.tabBarItemSelected}`}>
                                  All Servers
                                </div>
                                <div
                                  role="button"
                                  className={notificationStyles.tabBarItem}>
                                  This Server
                                </div>
                              </div>
                              <div className={notificationStyles.mentionFilter}>
                                <div className={notificationStyles.label}>
                                  Display:
                                </div>
                                <div className={notificationStyles.value}>
                                  Everything
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={notificationStyles.scrollWrap}>
                            <div className={notificationStyles.scroller}>
                              <span>
                                {loading === true ||
                                profile === null ||
                                typeof profile.notifications === 'undefined' ? (
                                  <Spinner
                                    isDarkTheme={isDarkTheme}
                                    myStyle={{
                                      width: '100%',
                                      height: '100%',
                                      position: 'relative'
                                    }}
                                  />
                                ) : profile.notifications.length === 0 ? (
                                  <div
                                    className={`${
                                      notificationStyles.emptyPlaceholder
                                    } ${notificationStyles.bottom}`}>
                                    <div className={notificationStyles.body}>
                                      And in the beginning... there was silence.
                                    </div>
                                    {isDarkTheme ? (
                                      <EmptyNotifDark
                                        className={notificationStyles.image}
                                      />
                                    ) : (
                                      <EmptyNotifLight
                                        className={notificationStyles.image}
                                      />
                                    )}
                                  </div>
                                ) : (
                                  profile.notifications
                                    .slice(0)
                                    .reverse()
                                    .map((notif, index) => {
                                      return (
                                        <React.Fragment>
                                          <div
                                            className={
                                              notificationStyles.channelSeperator
                                            }>
                                            <span
                                              className={
                                                notificationStyles.channelName
                                              }>
                                              #general
                                            </span>
                                            <span
                                              className={
                                                notificationStyles.guildName
                                              }>
                                              Arkane
                                            </span>
                                          </div>
                                          <div
                                            className={
                                              notificationStyles.msgGroupWrapper
                                            }>
                                            <div
                                              className={
                                                notificationStyles.msgGroup
                                              }>
                                              <div
                                                className={
                                                  notificationStyles.msgContainer
                                                }>
                                                <div
                                                  className={
                                                    notificationStyles.msg
                                                  }>
                                                  <div
                                                    className={
                                                      notificationStyles.msgHeader
                                                    }
                                                  />
                                                  <div
                                                    className={
                                                      notificationStyles.msgContent
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </React.Fragment>
                                      );
                                    })
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <MdNotifications
                          onClick={this.notificationsClickHandler}
                          className={styles.customHeaderIcon}
                        />
                        {notifCount !== 0 && notifCount !== null ? (
                          <div
                            className={`${notificationStyles.badgeWrapper} ${
                              notificationStyles.badge
                            }`}
                            style={
                              notifCount.length > 1
                                ? { right: '-7px' }
                                : { right: '-2px' }
                            }>
                            {notifCount}
                          </div>
                        ) : null}
                      </div>
                      <div className={styles.iconWrapper}>
                        <MdInformationCircle
                          onClick={this.infoPopupHandler}
                          className={styles.customHeaderIcon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {routes}
              </div>
            </div>
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
  showLogoutPopup: PropTypes.func.isRequired,
  getAllClasses: PropTypes.func.isRequired,
  getAllCourses: PropTypes.func.isRequired,
  getAllStaff: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  utils: state.utils,
  timetable: state.timetable,
  classes: state.classes,
  courses: state.courses,
  staff: state.staff
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    hideLogoutPopup,
    clearCurrentProfile,
    logoutUser,
    changeTheme,
    showLogoutPopup,
    getAllClasses,
    getAllCourses,
    getAllStaff
  }
)(withRouter(Dashboard));
