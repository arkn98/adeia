import React, { Component } from 'react';
import mainStyles from './Main.css';
import styles from './LeaveApplication.css';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...styles, ...mainStyles });

class LeaveApplication extends Component {
  state = {
    selectedRadio: 0
  };

  leaveString = [
    'Casual Leave',
    'Restricted Holiday',
    'Special Casual Leave',
    'On Duty',
    'Medical Leave',
    'Earn Leave',
    'Compensation Leave'
  ];

  options = {
    rt: {
      type: [0, 1, 2, 3, 4, 5, 6]
    }
  };

  /*
  0 - casual leave
  1 - restricted holiday
  2 - special casual leave
  3 - on duty
  4 - medical leave
  5 - earn leave
  6 - compensation leave
  */

  radioClickHandler = event => {
    let opt = event.target.getAttribute('radio-key');
    if (this.state.selectedRadio !== opt && opt != null) {
      console.log(opt);
      this.setState({ ...this.state, selectedRadio: opt });
    }
  };

  render() {
    const radioList = this.options.rt.type.map(leaveType => {
      return (
        <div
          key={leaveType}
          className={cx({
            radioItem: true,
            radioItemSelected: this.state.selectedRadio == leaveType
          })}
          onClick={this.radioClickHandler}
          radio-key={leaveType}
        >
          <label className={styles.checkBoxWrapper} radio-key={leaveType}>
            <input
              radio-key={leaveType}
              className={styles.formInput}
              type="checkbox"
            />
            <div
              radio-key={leaveType}
              className={cx({
                checkBoxCheckmarkOutline: true,
                checked: this.state.selectedRadio == leaveType
              })}
            >
              <svg
                className={styles.checkboxCheckmark}
                name="Checkmark"
                radio-key={leaveType}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" radio-key={leaveType} fillRule="evenodd">
                  <polyline
                    radio-key={leaveType}
                    stroke="#7289da"
                    strokeWidth="2"
                    points="3.5 9.5 7 13 15 5"
                  />
                </g>
              </svg>
            </div>
          </label>
          <div radio-key={leaveType} className={styles.radioContent}>
            <div radio-key={leaveType} className={styles.title}>
              {this.leaveString[leaveType]}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className={mainStyles.main}>
        <div className={mainStyles.topBarWrapper}>
          <div className={mainStyles.topBar}>
            <div className={mainStyles.pageTitle}>Leave Application</div>
            <div className={mainStyles.headerIcons}>
              {/* <div className={mainStyles.searchBarWrapper}>
                <div className={mainStyles.searchBar}>
                  <div className={mainStyles.search} />
                </div>
              </div>
              <div className={mainStyles.seperator} /> */}
              <div className={mainStyles.iconWrapper}>
                <a
                  title="GitHub Repo"
                  href="https://github.com/arkn98/lms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className={`icon ion-md-notifications ${
                      mainStyles.customHeaderIcon
                    }`}
                  />
                </a>
              </div>
              <div className={mainStyles.iconWrapper}>
                <a
                  title="GitHub Repo"
                  href="https://github.com/arkn98/lms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className={`icon ion-md-help ${
                      mainStyles.customHeaderIcon
                    }`}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={mainStyles.scrollWrapper}>
          <div className={mainStyles.contentWrapper}>
            <div className={mainStyles.body}>
              <div className={`${styles.formWrapper}`}>
                <div className={`${styles.formText} ${styles.formItemWrapper}`}>
                  <div
                    style={{
                      flex: '1 1 auto',
                      marginLeft: 0,
                      marginRight: 0,
                      width: '100%'
                    }}
                  >
                    <h4 className={styles.formTitle}>Apply for leave</h4>
                    <div className={styles.formSubtitle}>
                      Please note that your leave applications may not always be
                      approved. Contact HOD/Office if you have any queries.
                    </div>
                  </div>
                </div>
                <form className={styles.formBody}>
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}
                  >
                    <h5
                      className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`}
                    >
                      Name
                    </h5>
                    <div className={styles.inputWrapper}>
                      <input
                        className={`${styles.formInput} ${styles.disabled}`}
                        disabled
                        type="text"
                        placeholder="hello"
                      />
                    </div>
                  </div>
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}
                  >
                    <h5
                      className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`}
                    >
                      Designation
                    </h5>
                    <div className={styles.inputWrapper}>
                      <input
                        className={`${styles.formInput} ${styles.disabled}`}
                        disabled
                        type="text"
                        placeholder="hello"
                      />
                    </div>
                  </div>
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}
                  >
                    <h5
                      className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`}
                    >
                      Staff ID
                    </h5>
                    <div className={styles.inputWrapper}>
                      <input
                        className={`${styles.formInput} ${styles.disabled}`}
                        disabled
                        type="text"
                        placeholder="hello"
                      />
                    </div>
                  </div>
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}
                  >
                    <h5
                      className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`}
                    >
                      Leave Type
                    </h5>
                    <div className={styles.inputWrapper}>
                      <div className={styles.radioGroup}>{radioList}</div>
                    </div>
                  </div>
                </form>
                <div className={styles.formSubmit} />
              </div>
              {/* <div className={mainStyles.marginTop20}>
                <div className={mainStyles.welcomeMessage}>Apply for leaves</div>
                <div className={mainStyles.boxContainer}>
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-chatbubbles ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>CPL Credits</div>
                      <div className={mainStyles.subtitle}>
                        Check available CPL credits
                      </div>
                    </div>
                  </div>
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-today ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>Leave Status</div>
                      <div className={mainStyles.subtitle}>
                        Check status of applied leaves
                      </div>
                    </div>
                  </div>{' '}
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-stopwatch ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>Awaiting Alterations</div>
                      <div className={mainStyles.subtitle}>
                        Check the alternations given to you
                      </div>
                    </div>
                  </div>{' '}
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-repeat ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>Compensations</div>
                      <div className={mainStyles.subtitle}>
                        Check the list of compensations
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${mainStyles.boxContainer} ${mainStyles.mainFuncs}`}>
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>Leave Availability</div>
                    </div>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-repeat ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                  </div>
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>Recent Logins</div>
                    </div>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-repeat ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeaveApplication;