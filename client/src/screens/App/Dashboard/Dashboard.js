import React, { Component, Fragment } from 'react';
import styles from './Dashboard.module.scss';
import { Switch, Route, Link } from 'react-router-dom';
import {
  MdMenu,
  MdInformationCircle,
  MdNotifications
} from '../../../assets/icons';
import SideNav from '../shared/components/SideNav';
import Main from './screens/Main';
import LeaveApplication from './screens/LeaveApplication';
import LeaveList from './screens/LeaveList';
import LeaveSingle from './screens/LeaveSingle';
import Timetable from './screens/Timetable';
import AddStaff from './screens/AddStaff';
import EditStaff from './screens/EditStaff';
import AddAdmin from './screens/AddAdmin';
import AddUpdateCourse from './screens/AddUpdateCourse';
import AddUpdateClass from './screens/AddUpdateClass';
import AddUpdateLeaveType from './screens/AddUpdateLeaveType';
import AddUpdateLeaveAllocation from './screens/AddUpdateLeaveAllocation';
import Settings from './screens/Settings';
import Error from '../shared/components/Error';
import { FullPageSpinner } from 'screens/App/shared/common/Spinner';
import { accountTypes } from 'data';

class Dashboard extends Component {
  state = {
    isSideNavVisible: false,
    isSettingsMenuVisible: false,
    isLoading: !this.props.auth.isLoaded
  };

  componentDidMount = () => {
    if (!this.props.auth.isLoaded) {
      this.props.getCurrentUser(this.props.auth.user.id).then(res => {
        this.setState({ ...this.state, isLoading: false });
      });
    }
    if (!this.props.profile.isLoaded) {
      this.props.getCurrentProfile();
    }
  };

  sideNavToggle = () => {
    this.setState({
      ...this.state,
      isSideNavVisible: !this.state.isSideNavVisible,
      isSettingsMenuVisible: false
    });
  };

  sideNavShow = () => {
    this.setState({
      ...this.state,
      isSideNavVisible: true,
      isSettingsMenuVisible: false
    });
  };

  sideNavHide = () => {
    this.setState({
      ...this.state,
      isSideNavVisible: false,
      isSettingsMenuVisible: false
    });
  };

  settingsMenuShow = () => {
    this.setState({
      ...this.state,
      isSettingsMenuVisible: true
    });
  };

  settingsMenuHide = () => {
    this.setState({
      ...this.state,
      isSettingsMenuVisible: false
    });
  };

  settingsMenuToggle = () => {
    this.setState({
      ...this.state,
      isSettingsMenuVisible: !this.state.isSettingsMenuVisible
    });
  };

  render = () => {
    const props = this.props;
    let pages = [];
    if (props.auth.user.accountType === accountTypes.ADMIN) {
      pages.push(
        <Route
          path="/dashboard/leave/list"
          exact
          render={() => (
            <LeaveList
              pageTitle="All Leaves"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/timetable"
          exact
          render={() => (
            <Timetable
              pageTitle="Timetable"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/staff/add"
          exact
          render={() => (
            <AddStaff
              pageTitle="Add Staff"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/staff/edit"
          exact
          render={() => (
            <EditStaff
              pageTitle="Edit Staff"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/priv-account/add"
          exact
          render={() => (
            <AddAdmin
              pageTitle="Add Privileged Account"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/course"
          exact
          render={() => (
            <AddUpdateCourse
              pageTitle="Course Settings"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/class"
          exact
          render={() => (
            <AddUpdateClass
              pageTitle="Class Settings"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/leave-type"
          exact
          render={() => (
            <AddUpdateLeaveType
              pageTitle="Leave Type Settings"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/leave-allocation"
          exact
          render={() => (
            <AddUpdateLeaveAllocation
              pageTitle="Leave Allocation Settings"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
    } else {
      pages.push(
        <Route
          path="/dashboard/leave/apply"
          exact
          render={() => (
            <LeaveApplication
              pageTitle="Apply for leave"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/leave/list"
          exact
          render={() => (
            <LeaveList
              pageTitle="My Leaves"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
    }
    pages.push(
      <Route
        path="/dashboard/leave/view/:leaveId"
        exact
        render={() => (
          <LeaveSingle pageTitle="Leave" showPopout={this.props.showPopout} />
        )}
      />
    );
    pages.push(
      <Route
        path="/dashboard/settings"
        exact
        render={() => (
          <Settings
            pageTitle="Account Settings"
            showPopout={this.props.showPopout}
          />
        )}
      />
    );
    pages.push(<Route path="/dashboard" exact component={Main} />);
    pages.push(
      <Route
        render={() => (
          <Error
            updateCurrentRouteTitle={this.props.updateCurrentRouteTitle}
            pageTitle="Page not found"
            inDashboard={true}
            message="We can't find the page that you're looking for :("
            footerAltColors={false}
            showButton={true}
            buttonLocation="back"
            buttonContent="Go back">
            404
          </Error>
        )}
      />
    );
    if (this.state.isLoading) {
      return (
        <Fragment>
          <FullPageSpinner />
        </Fragment>
      );
    } else {
      return (
        <div className={styles.dashMount}>
          <div
            className={`${styles.sideNavWrapper} ${
              this.state.isSideNavVisible ? styles.sideNavVisible : null
            }`}>
            {this.state.isSideNavVisible ? (
              <div
                onClick={event => this.sideNavHide()}
                className={styles.backdrop}
              />
            ) : null}
            <SideNav
              auth={this.props.auth}
              showPopout={this.props.showPopout}
              isSideNavVisible={this.state.isSideNavVisible}
              isSettingsMenuVisible={this.state.isSettingsMenuVisible}
              sideNavHide={this.sideNavHide}
              settingsMenuShow={this.settingsMenuShow}
              settingsMenuHide={this.settingsMenuHide}
              settingsMenuToggle={this.settingsMenuToggle}
            />
          </div>
          <div className={styles.mainWrapper}>
            <div className={styles.main}>
              <div className={styles.topBarWrapper}>
                <div className={styles.topBar}>
                  <div className={styles.topBarLeftTitleFlex}>
                    <div
                      className={`${styles.topBarHamburgerWrapper} ${
                        styles.mobileVisible
                      }`}>
                      <MdMenu
                        onClick={this.sideNavToggle}
                        className={styles.topBarIcon}
                      />
                    </div>
                    <div className={styles.pageTitle}>
                      {props.utils.currentPageTitle}
                    </div>
                  </div>
                  <div className={styles.topBarRightIconFlex}>
                    {/* <div className={styles.searchBarWrapper}>
                  <div className={styles.search}>
                    <div className={styles.searchBar}>Search</div>
                  </div>
                </div> 
                <div>search</div>
                <div className={styles.seperator} /> */}
                    <div className={styles.topBarIconWrapper}>
                      <MdNotifications
                        onClick={() => {
                          this.props.showPopout({
                            type: 'notifications'
                          });
                        }}
                        className={`${styles.topBarIcon} ${
                          styles.topBarIconMedium
                        }`}
                      />
                    </div>
                    <div className={styles.topBarIconWrapper}>
                      <Link to="/dashboard/info">
                        <MdInformationCircle
                          className={`${styles.topBarIcon} ${
                            styles.topBarIconMedium
                          }`}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.scrollWrapper}>
                <div className={styles.contentWrapper}>
                  <div className={styles.body}>
                    <Switch>{pages}</Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
}

export default Dashboard;
