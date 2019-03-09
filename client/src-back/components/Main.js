import React, { Component } from 'react';
import styles from './Main.module.css';
import PropTypes from 'prop-types';
import moment from 'moment';
import Spinner from './common/Spinner';
import { ReactComponent as MdDropdownPlus } from '../assets/icons/md-add-circle.svg';
import { ReactComponent as MdDropdownMinus } from '../assets/icons/md-remove-circle.svg';
import ProgressBar from './common/ProgressBar';

moment().local();

class Main extends Component {
  state = {
    profile: {},
    errors: {},
    user: {},
    prevLoginClickedIndex: -1
  };

  prevLoginClickedHandler = index => {
    if (this.state.prevLoginClickedIndex === index)
      this.setState({
        ...this.state,
        prevLoginClickedIndex: -1
      });
    else
      this.setState({
        ...this.state,
        prevLoginClickedIndex: index
      });
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle('Dashboard');
  };

  leaveTypeNames = [
    'Dummy',
    'Casual leave',
    'Compensation leave',
    'Earn leave',
    'Medical leave',
    'On Duty',
    'Restricted holiday',
    'Special Casual leave',
    'Casual leave',
    'Casual leave',
    'Casual leave'
  ];

  render() {
    let boxes = null;
    const { loading, profile } = this.props.profile;

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
      <div className={styles.scrollWrapper}>
        <div className={styles.contentWrapper}>
          <div className={styles.body}>
            <div
              className={`${styles.welcomeMessage} ${styles.marginTop20} ${
                styles.marginBottom20
              }`}>
              Welcome, {this.props.auth.user.name}
            </div>
            {boxes}
            <div className={`${styles.boxContainer} ${styles.mainFuncs}`}>
              {this.props.auth.user.accountType !== 0 ? (
                <div className={styles.box}>
                  <div style={{ overflowY: 'auto' }}>
                    <div className={styles.boxText}>
                      <div>
                        <span className={styles.title}>Available Leaves</span>
                        {/*<span className={styles.subtitle}>(approximate)</span>*/}
                      </div>
                    </div>
                    {loading === true ||
                    profile === null ||
                    typeof profile.prevLogins === 'undefined' ? (
                      <Spinner
                        myStyle={{
                          width: '100%',
                          minHeight: '50px',
                          height: '100%',
                          position: 'relative'
                        }}
                        subStyle={{ top: '-25%' }}
                      />
                    ) : (
                      <div className={styles.itemsContainer}>
                        {profile.leaveAvailable.leaveAllowed
                          .filter(x => x !== 0)
                          .map((item, index) => {
                            return (
                              <div key={index} className={styles.leaveItem}>
                                <div className={styles.leaveItemInfo}>
                                  <div className={styles.leaveTypeTitle}>
                                    {this.leaveTypeNames[item]}
                                  </div>
                                  <div className={styles.leaveTypeStats}>
                                    {profile.leaveAvailable.noOfDays[item]} /{' '}
                                    {profile.leaveAllotted.noOfDays[item]}
                                  </div>
                                </div>
                                <ProgressBar
                                  key={index}
                                  myKey={index}
                                  barWidth={
                                    profile.leaveAvailable.noOfDays[item]
                                  }
                                  trackWidth={
                                    profile.leaveAllotted.noOfDays[item]
                                  }
                                />
                              </div>
                            );
                          }, this)}
                      </div>
                    )}
                    {/*
                <div className={styles.boxIcon}>
                   <i
                      className={`icon ion-md-repeat ${
                        styles.customHeaderIcon
                      }`}
                    /> 
                </div>
                    */}
                  </div>
                </div>
              ) : null}
              <div className={styles.box}>
                <div style={{ overflowY: 'auto' }}>
                  <div className={styles.boxText}>
                    <div>
                      <span className={styles.title}>
                        Recent Login Attempts{' '}
                      </span>
                      <span className={styles.subtitle}>(approximate)</span>
                    </div>
                  </div>
                  {loading === true ||
                  profile === null ||
                  typeof profile.prevLogins === 'undefined' ? (
                    <Spinner
                      myStyle={{
                        width: '100%',
                        minHeight: '50px',
                        height: '100%',
                        position: 'relative'
                      }}
                      subStyle={{ top: '-25%' }}
                    />
                  ) : (
                    <div className={styles.itemsContainer}>
                      {profile.prevLogins
                        .slice(0)
                        .reverse()
                        .map((item, index) => {
                          return (
                            <div
                              onClick={() =>
                                this.prevLoginClickedHandler(index)
                              }
                              key={index}
                              name={index}
                              className={styles.prevLoginItem}>
                              <div className={styles.prevLoginItemTop}>
                                <div>
                                  <span className={styles.ip}>{item.ip} </span>
                                  <span className={styles.subtitle}>
                                    {this.state.prevLoginClickedIndex !== index
                                      ? moment
                                          .unix(item.timestamp)
                                          .format('D-MMM-YY, hh:mm:ss A')
                                      : null}
                                    {index === 0
                                      ? ' (Your current login)'
                                      : null}
                                  </span>
                                </div>
                                <div>
                                  <span
                                    style={{
                                      color:
                                        item.attemptStatus === 'false'
                                          ? `rgb(240, 71, 71)`
                                          : `rgb(67, 181, 129)`,
                                      fontWeight: '500'
                                    }}>
                                    {item.attemptStatus === 'false'
                                      ? 'Failed'
                                      : 'Successful'}
                                  </span>
                                  {this.state.prevLoginClickedIndex !==
                                  index ? (
                                    <MdDropdownPlus
                                      className={styles.customIconTest}
                                    />
                                  ) : (
                                    <MdDropdownMinus
                                      className={styles.customIconTest}
                                    />
                                  )}
                                </div>
                              </div>
                              <div
                                className={`${styles.prevLoginItemBody} ${
                                  this.state.prevLoginClickedIndex === index
                                    ? styles.prevLoginItemBodyVisible
                                    : ''
                                }`}>
                                <div>
                                  {item.browser}{' '}
                                  {typeof item.browserVersion !== 'undefined'
                                    ? item.browserVersion
                                    : null}{' '}
                                  - {item.os}{' '}
                                  {typeof item.osVersion !== 'undefined'
                                    ? item.osVersion
                                    : null}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  {moment
                                    .unix(item.timestamp)
                                    .format('D-MMM-YY, hh:mm:ss A')}
                                </div>
                              </div>
                            </div>
                          );
                        }, this)}
                    </div>
                  )}
                  {/*
                <div className={styles.boxIcon}>
                   <i
                      className={`icon ion-md-repeat ${
                        styles.customHeaderIcon
                      }`}
                    /> 
                </div>
                    */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  utils: PropTypes.object.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired
};

export default Main;
