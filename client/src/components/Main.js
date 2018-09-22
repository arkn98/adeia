import React, { Component } from 'react';
import styles from './Main.css';
import notificationStyles from './notificationStyles.css';
//import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Main extends Component {
  state = {
    isNotificationsVisible: false
  };

  notificationsClickHandler = event => {
    this.setState({
      isNotificationsVisible: !this.state.isNotificationsVisible
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

    let boxes = null;

    if (this.props.auth.user.accountType === 0) {
      boxes = (
        <div className={`${styles.boxContainer}`}>
          <div className={`${styles.box} ${styles.boxHover}`}>
            <div className={styles.boxIcon}>
              <i className={`icon ion-md-today ${styles.customHeaderIcon}`} />
            </div>
            <div className={styles.boxText}>
              <div className={styles.title}>Today's Leave List</div>
              {/* <div className={styles.subtitle}>Check list of staff </div> */}
            </div>
          </div>
          <div className={`${styles.box} ${styles.boxHover}`}>
            <div className={styles.boxIcon}>
              <i className={`icon ion-md-repeat ${styles.customHeaderIcon}`} />
            </div>
            <div className={styles.boxText}>
              <div className={styles.title}>Today's Altered List</div>
            </div>
          </div>{' '}
          <div className={`${styles.box} ${styles.boxHover}`}>
            <div className={styles.boxIcon}>
              <i className={`icon ion-md-time ${styles.customHeaderIcon}`} />
            </div>
            <div className={styles.boxText}>
              <div className={styles.title}>Leaves Awaiting Response</div>
            </div>
          </div>{' '}
          <div className={`${styles.box} ${styles.boxHover}`}>
            <div className={styles.boxIcon}>
              <i
                className={`icon ion-md-thumbs-down ${styles.customHeaderIcon}`}
              />
            </div>
            <div className={styles.boxText}>
              <div className={styles.title}>Declined Leave List</div>
            </div>
          </div>
          <div className={`${styles.box} ${styles.boxHover}`}>
            <div className={styles.boxIcon}>
              <i className={`icon ion-md-cash ${styles.customHeaderIcon}`} />
            </div>
            <div className={styles.boxText}>
              <div className={styles.title}>CPL Clearance</div>
            </div>
          </div>
          <div className={`${styles.box} ${styles.boxHover}`}>
            <div className={styles.boxIcon}>
              <i
                className={`icon ion-md-close-circle ${
                  styles.customHeaderIcon
                }`}
              />
            </div>
            <div className={styles.boxText}>
              <div className={styles.title}>Cancel Request</div>
            </div>
          </div>
          <div className={`${styles.box} ${styles.boxHover}`}>
            <div className={styles.boxIcon}>
              <i
                className={`icon ion-md-list-box ${styles.customHeaderIcon}`}
              />
            </div>
            <div className={styles.boxText}>
              <div className={styles.title}>Leave List</div>
            </div>
          </div>
        </div>
      );
    } else {
      boxes = (
        <div className={`${styles.boxContainer}`}>
          <div className={`${styles.box} ${styles.boxHover}`}>
            <div className={styles.boxIcon}>
              <i className={`icon ion-md-cash ${styles.customHeaderIcon}`} />
            </div>
            <div className={styles.boxText}>
              <div className={styles.title}>CPL Credits</div>
              <div className={styles.subtitle}>Check available CPL credits</div>
            </div>
          </div>
          <div className={`${styles.box} ${styles.boxHover}`}>
            <div className={styles.boxIcon}>
              <i
                className={`icon ion-md-checkbox-outline ${
                  styles.customHeaderIcon
                }`}
              />
            </div>
            <div className={styles.boxText}>
              <div className={styles.title}>Leave Status</div>
              <div className={styles.subtitle}>
                Check status of applied leaves
              </div>
            </div>
          </div>{' '}
          <div className={`${styles.box} ${styles.boxHover}`}>
            <div className={styles.boxIcon}>
              <i
                className={`icon ion-md-construct ${styles.customHeaderIcon}`}
              />
            </div>
            <div className={styles.boxText}>
              <div className={styles.title}>Awaiting Alterations</div>
              <div className={styles.subtitle}>
                Check the alternations given to you
              </div>
            </div>
          </div>{' '}
          <div className={`${styles.box} ${styles.boxHover}`}>
            <div className={styles.boxIcon}>
              <i className={`icon ion-md-repeat ${styles.customHeaderIcon}`} />
            </div>
            <div className={styles.boxText}>
              <div className={styles.title}>Compensations</div>
              <div className={styles.subtitle}>
                Check the list of compensations
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.main}>
        <div className={styles.topBarWrapper}>
          <div className={styles.topBar}>
            <div className={styles.pageTitle}>Dashboard</div>
            <div className={styles.headerIcons}>
              {/* <div className={styles.searchBarWrapper}>
                <div className={styles.searchBar}>
                  <div className={styles.search} />
                </div>
              </div>
              <div className={styles.seperator} /> */}
              <div
                onClick={this.notificationsClickHandler}
                className={styles.iconWrapper}
                style={{ position: 'relative' }}
              >
                <i
                  className={`icon ion-md-notifications ${
                    styles.customHeaderIcon
                  }`}
                />
                <div
                  className={`${notificationStyles.badgeWrapper} ${
                    notificationStyles.badge
                  }`}
                >
                  10
                </div>
              </div>
              <div className={styles.iconWrapper}>
                <a
                  title="GitHub Repo"
                  href="https://github.com/arkn98/lms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className={`icon ion-md-help ${styles.customHeaderIcon}`}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.scrollWrapper}>
          <div className={styles.contentWrapper}>
            <div className={styles.body}>
              <div
                className={`${styles.welcomeMessage} ${styles.marginTop20} ${
                  styles.marginBottom20
                }`}
              >
                Welcome, {this.props.auth.user.name}
              </div>
              {boxes}
              <div className={`${styles.boxContainer} ${styles.mainFuncs}`}>
                {this.props.auth.user.accountType !== 0 ? (
                  <div className={styles.box}>
                    <div className={styles.boxText}>
                      <div className={styles.title}>Leave Availability</div>
                      {/* <div className={styles.subtitle}>Leave Availability</div> */}
                    </div>
                    {/* <div className={styles.boxIcon}>
                    <i
                      className={`icon ion-md-repeat ${
                        styles.customHeaderIcon
                      }`}
                    />
                  </div> */}
                  </div>
                ) : null}
                <div className={styles.box}>
                  <div className={styles.boxText}>
                    <div>
                      <span className={styles.title}>Recent Logins </span>
                      <span className={styles.subtitle}>(approximate)</span>
                    </div>
                  </div>
                  {/* <div className={styles.boxIcon}>
                    <i
                      className={`icon ion-md-repeat ${
                        styles.customHeaderIcon
                      }`}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${notificationStyles.popouts} ${
            notificationStyles.popout
          } ${settingsMenuStyles.join(' ')}`}
        >
          <div className={notificationStyles.item}>
            <i
              className={`icon ion-md-build ${notificationStyles.menuIcon}`}
              title="Update Profile"
            />
            Update Profile
          </div>
          <div className={notificationStyles.item}>
            <i
              className={`icon ion-md-lock ${notificationStyles.menuIcon}`}
              title="Change Password"
            />
            Change Password
          </div>
          {/* <div className={notificationStyles.seperator2} /> */}
          <div
            onClick={this.logoutHandler}
            className={`${notificationStyles.item} ${
              notificationStyles.danger
            }`}
          >
            <i
              className={`icon ion-md-close ${notificationStyles.menuIcon}`}
              title="Logout"
            />
            Logout
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {}
)(Main);
