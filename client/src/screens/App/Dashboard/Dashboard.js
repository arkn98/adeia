import React, { Component } from 'react';
import styles from './Dashboard.module.scss';
import { Switch, Route } from 'react-router-dom';
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
import Error from '../shared/components/Error';

class Dashboard extends Component {
  state = {
    isSideNavVisible: false,
    isSettingsMenuVisible: false
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
    if (props.auth.user.accountType === 0) {
      pages.push(
        <Route
          key="leavelist"
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
    } else {
      pages.push(
        <Route
          key="leaveapplication"
          path="/dashboard/leave/apply"
          exact
          render={() => <LeaveApplication showPopout={this.props.showPopout} />}
        />
      );
      pages.push(
        <Route
          key="leavelist"
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
        key="leave"
        path="/dashboard/leave/view/:leaveId"
        exact
        render={() => (
          <LeaveSingle pageTitle="Leave" showPopout={this.props.showPopout} />
        )}
      />
    );
    pages.push(<Route key="main" path="/dashboard" exact component={Main} />);
    pages.push(
      <Route
        key="404"
        render={() => (
          <Error
            updateCurrentRouteTitle={this.props.updateCurrentRouteTitle}
            pageTitle="Page not found"
            inDashboard={true}
            message="We can't find the page that you're looking for :("
            footerAltColors={true}
            showButton={true}
            buttonLocation="back"
            buttonContent="Go back">
            404
          </Error>
        )}
      />
    );

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
                    <MdInformationCircle
                      onClick={() => {
                        this.props.showPopout({
                          type: 'modalSingleButton',
                          title: 'Instructions Sent',
                          message:
                            'We sent instructions to change your password to please check both your inbox & spam folder.',
                          buttonPrimary: true,
                          buttonContent: 'Okay'
                        });
                      }}
                      className={`${styles.topBarIcon} ${
                        styles.topBarIconMedium
                      }`}
                    />
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
  };
}

export default Dashboard;
