import React, { Component, Suspense, lazy } from 'react';
import io from 'socket.io-client';
import { Switch, Route, Link } from 'react-router-dom';
import styles from './Dashboard.module.scss';
import {
  MdMenu,
  MdInformationCircle,
  MdNotifications
} from '../../../assets/icons';
import SideNav from '../shared/components/SideNav';
import Main from './screens/Main';
import { FullPageSpinner } from 'screens/App/shared/common/Spinner';
import { Tooltip } from 'screens/App/shared/common/Tooltip';
import { IconBadge } from 'screens/App/shared/common/Badge';
import { accountTypes, holidayTypes, staffTypes } from 'data';

const LeaveApplication = lazy(() => import('./screens/LeaveApplication'));
const Error = lazy(() => import('../shared/components/Error'));
const LeaveList = lazy(() => import('./screens/LeaveList'));
const LeaveSingle = lazy(() => import('./screens/LeaveSingle'));
const AlterationSingle = lazy(() => import('./screens/AlterationSingle'));
const Timetable = lazy(() => import('./screens/Timetable'));
const AddStaff = lazy(() => import('./screens/AddStaff'));
const EditStaff = lazy(() => import('./screens/EditStaff'));
const AddAdmin = lazy(() => import('./screens/AddAdmin'));
const AddUpdateCourse = lazy(() => import('./screens/AddUpdateCourse'));
const AddUpdateClass = lazy(() => import('./screens/AddUpdateClass'));
const AddUpdateClassGroup = lazy(() => import('./screens/AddUpdateClassGroup'));
const AddUpdateLeaveType = lazy(() => import('./screens/AddUpdateLeaveType'));
const LeaveAcceptReject = lazy(() => import('./screens/LeaveAcceptReject'));
const AddUpdateLeaveAllocation = lazy(() =>
  import('./screens/AddUpdateLeaveAllocation')
);
const AddUpdateHoliday = lazy(() => import('./screens/AddUpdateHoliday'));
const ViewHolidays = lazy(() => import('./screens/ViewHolidays'));
const Settings = lazy(() => import('./screens/Settings'));
const AlterationList = lazy(() => import('./screens/AlterationList'));
const MiscSettings = lazy(() => import('./screens/MiscSettings'));

class Dashboard extends Component {
  state = {
    isSideNavVisible: false,
    isSettingsMenuVisible: false,
    isLoading: !this.props.auth.isLoaded,
    acceptRejectFilter: Object.values(staffTypes)
  };

  componentDidMount = () => {
    if (!this.props.auth.isLoaded) {
      this.props.getCurrentUser(this.props.auth.user.id).then(res => {
        this.setState({ ...this.state, isLoading: false });

        const socket = io.connect('', {
          query: { token: this.props.auth.user.OTToken }
        });

        socket.on('connect', () => {
          console.log('connected to socket io server');
          socket.emit('subscribeToNotifications', {
            user: this.props.auth.user.id
          });
        });

        socket.on('newNotification', data => {
          this.props.getNotificationFromSocket(data);
        });

        socket.on('error', err => {
          console.log('err', err);
        });
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

  acceptRejectFilterHandler = val => {
    this.setState({ ...this.state, acceptRejectFilter: val });
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
    let newNotifCount = 0;
    if (
      props.profile &&
      props.profile.profile &&
      props.profile.profile.notifications
    ) {
      newNotifCount = props.profile.profile.notifications
        .slice(0)
        .filter(x => x.isNew === true).length;
    }
    let pages = [];
    if (props.auth.user.accountType === accountTypes.ADMIN) {
      pages.push(
        <Route
          path="/dashboard/leave"
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
          path="/dashboard/leave/:leaveId"
          exact
          render={() => (
            <LeaveSingle
              parentPageTitle="All Leaves"
              pageTitle="Leave"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/leave-action"
          exact
          render={() => (
            <LeaveAcceptReject
              acceptRejectFilterHandler={this.acceptRejectFilterHandler}
              acceptRejectFilter={this.state.acceptRejectFilter}
              pageTitle="Leaves requiring action"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/alteration"
          exact
          render={() => (
            <AlterationList
              pageTitle="All Alterations"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/alteration/:alterationId"
          exact
          render={() => (
            <AlterationSingle
              parentPageTitle="All Alterations"
              pageTitle="Alteration"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/misc"
          exact
          render={() => (
            <MiscSettings
              pageTitle="Miscellaneous Settings"
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
          path="/dashboard/holiday"
          exact
          render={() => (
            <AddUpdateHoliday
              pageTitle="Holiday Settings"
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
          path="/dashboard/class-group"
          exact
          render={() => (
            <AddUpdateClassGroup
              pageTitle="Class Group Settings"
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
          path="/dashboard/leave-apply"
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
          path="/dashboard/holiday/public"
          exact
          render={() => (
            <ViewHolidays
              key="publicholidays"
              pageTitle="View Public holidays"
              holidayTypeLabel="Public Holidays"
              holidayType={holidayTypes.PUBLIC_HOLIDAY}
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/holiday/restricted"
          exact
          render={() => (
            <ViewHolidays
              key="restrictedholidays"
              pageTitle="View Restricted holidays"
              holidayTypeLabel="Restricted Holidays"
              holidayType={holidayTypes.RESTRICTED_HOLIDAY}
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/alteration"
          exact
          render={() => (
            <AlterationList
              pageTitle="Alterations for me"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/alteration/:alterationId"
          exact
          render={() => (
            <AlterationSingle
              parentPageTitle="Alterations for me"
              pageTitle="Alteration"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/leave"
          exact
          render={() => (
            <LeaveList
              pageTitle="My Leaves"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
      pages.push(
        <Route
          path="/dashboard/leave/:leaveId"
          exact
          render={() => (
            <LeaveSingle
              parentPageTitle="My Leaves"
              pageTitle="Leave"
              showPopout={this.props.showPopout}
            />
          )}
        />
      );
    }
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
            showIllustration="not-found"
            showButton={true}
            buttonLocation="back"
            buttonContent="Go back">
            404
          </Error>
        )}
      />
    );

    /* if (this.state.isLoading) {
      return <FullPageSpinner />;
    } else { */
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
                  <Tooltip content="Notifications" placement="bottom">
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
                      {newNotifCount !== 0 ? (
                        <IconBadge notifCount={newNotifCount} />
                      ) : null}
                    </div>
                  </Tooltip>
                  <Tooltip content="About" placement="bottom">
                    <div className={styles.topBarIconWrapper}>
                      <Link to="/dashboard/info">
                        <MdInformationCircle
                          className={`${styles.topBarIcon} ${
                            styles.topBarIconMedium
                          }`}
                        />
                      </Link>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className={styles.scrollWrapper}>
              <div className={styles.contentWrapper}>
                <div className={styles.body}>
                  <Suspense
                    fallback={<FullPageSpinner loadingPrimary={true} />}>
                    <Switch>{pages}</Switch>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    /* } */
  };
}

export default Dashboard;
