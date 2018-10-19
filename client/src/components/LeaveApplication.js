import React, { Component } from 'react';
import mainStyles from './Main.module.css';
import styles from './LeaveApplication.module.css';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const cx = classNames.bind({ ...mainStyles, ...styles });

moment().local();

class LeaveApplication extends Component {
  state = {
    isInfoBoxVisible: false,
    isVacationSelected: false,
    staffId: '',
    name: '',
    designation: '',
    noOfDays: 1,
    from: moment(),
    startDate: moment(),
    to: moment(),
    reason: ''
  };

  inputOnChangeHandler = event => {
    //console.log(moment().toString());
    this.setState({ [event.target.name]: event.target.value });
  };

  addWeekdays = (date, days) => {
    date = moment(date); // use a clone
    while (days > 0) {
      date = date.add(1, 'days');
      // decrease "days" only if it's a weekday.
      if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
        days -= 1;
      }
    }
    return date;
  };

  vacationSelectToggler = event => {
    this.setState({
      ...this.state,
      isVacationSelected: !this.state.isVacationSelected
    });
  };

  infoBoxToggleHandler = event => {
    this.setState({
      ...this.state,
      isInfoBoxVisible: !this.state.isInfoBoxVisible
    });
  };

  handleDateChange = date => {
    if (moment().isAfter(date))
      alert("Please note: You are selecting a date prior to today's date");
    this.setState({
      ...this.state,
      from: date
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ ...this.state, errors: nextProps.errors });
    }
  };

  leaveString = [
    'Select a leave category',
    'Casual Leave',
    'Compensation Leave',
    'Earn Leave',
    'Medical Leave',
    'On Duty',
    'Restricted Holiday',
    'Special Casual Leave',
    'Casual Leave - 30 Days',
    'Casual Leave - 20 Days',
    'Casual Leave - 6 Days'
  ];

  //staff type
  //0 -- regular teaching -- rt
  //1 -- regular non teaching -- rnt
  //2 -- teaching fellows -- tf
  //3 -- non teaching (no leave) -- nt
  //4 -- research scholars - 30 days -- rs30
  //5 -- research scholars - 20 days -- rs20
  //6 -- research scholars - others (6 days) -- rso
  //7 -- others -- oth

  options = {
    rt: {
      type: [0, 1, 2, 3, 4, 5, 6, 7]
    },
    rnt: {
      type: [0, 1, 2, 3, 4, 5, 6, 7]
    },
    tf: {
      type: [0, 2, 5, 10]
    },
    nt: {
      type: [0, 2]
    },
    rs30: {
      type: [0, 5, 8]
    },
    rs20: {
      type: [0, 5, 9]
    },
    rso: {
      type: [0, 5, 8]
    },
    oth: {
      type: [0]
    }
  };

  /*
  0 - select a leave category
  1 - casual leave
  2 - restricted holiday
  3 - special casual leave
  4 - on duty
  5 - medical leave
  6 - earn leave
  7 - compensation leave
  */

  radioClickHandler = event => {
    let opt = event.target.getAttribute('radio-key');
    if (this.state.selectedRadio !== opt && opt != null) {
      //console.log(opt);
      this.setState({ ...this.state, selectedRadio: opt });
    }
  };

  render() {
    const { errors } = this.props;
    const optList = this.options[this.props.auth.user.staffType].type.map(
      leaveType => {
        return <option key={leaveType}>{this.leaveString[leaveType]}</option>;
      }
    );

    /* const radioList = this.options.rt.type.map(leaveType => {
      return (
        <div
          key={leaveType}
          className={cx({
            radioItem: true,
            radioItemSelected: this.state.selectedRadio === leaveType
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
                checked: this.state.selectedRadio === leaveType
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
    }); */

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
                  rel="noopener noreferrer">
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
                  rel="noopener noreferrer">
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
                    }}>
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
                    }`}>
                    <h5
                      className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`}>
                      Staff ID
                    </h5>
                    <div className={styles.inputWrapper}>
                      <input
                        className={`${styles.formInput} ${styles.disabled}`}
                        disabled
                        type="text"
                        name="staffId"
                        onChange={this.inputOnChangeHandler}
                        value={this.props.auth.user.staffId}
                      />
                    </div>
                  </div>
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}>
                    <h5
                      className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`}>
                      Name
                    </h5>
                    <div className={styles.inputWrapper}>
                      <input
                        className={`${styles.formInput} ${styles.disabled}`}
                        disabled
                        type="text"
                        value={this.props.auth.user.name}
                      />
                    </div>
                  </div>
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}>
                    <h5
                      className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`}>
                      Designation
                    </h5>
                    <div className={styles.inputWrapper}>
                      <input
                        className={`${styles.formInput} ${styles.disabled}`}
                        disabled
                        type="text"
                        value={this.props.auth.user.designation}
                      />
                    </div>
                  </div>

                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}>
                    <h5
                      className={cx({
                        formFieldLabel: true,
                        marginBottom8: true,
                        errorLabel: errors.category
                      })}>
                      Leave Type
                      {errors.category ? (
                        <span className={styles.errorMessage}>
                          {' '}
                          - {errors.category}
                        </span>
                      ) : null}
                    </h5>
                    <div
                      className={`${mainStyles.marginBottom20} ${
                        styles.formItemWrapper
                      }`}>
                      <select
                        onChange={this.inputOnChangeHandler}
                        name="category"
                        value={this.state.category}
                        className={cx({
                          formInput: true,
                          formSelect: true,
                          formInputError: errors.designation
                        })}
                        type="text">
                        {optList}
                        {/* <option>Select a category</option>
                        <option>Regular Teaching Staff</option>
                        <option>Regular Non-Teaching Staff</option>
                        <option>Teaching Fellows</option>
                        <option>Non-Teaching - No Leave</option>
                        <option>Research Scholars - 30</option>
                        <option>Research Scholars - 20</option>
                        <option>Research Scholars - Others</option>
                        <option>Others</option> */}
                      </select>
                    </div>
                    <div
                      className={`${mainStyles.marginBottom20} ${
                        styles.formItemWrapper
                      }`}>
                      <div className={styles.formItemRow}>
                        <div className={styles.formItemRowChild}>
                          <h5
                            className={`${styles.formFieldLabel} ${
                              mainStyles.marginBottom8
                            }`}>
                            No. of days
                          </h5>
                          <div className={styles.inputWrapper}>
                            <input
                              className={`${styles.formInput}`}
                              type="text"
                              onChange={this.inputOnChangeHandler}
                              name="noOfDays"
                              value={this.state.noOfDays}
                            />
                          </div>
                        </div>
                        <div className={styles.formItemRowChild}>
                          <h5
                            className={`${styles.formFieldLabel} ${
                              mainStyles.marginBottom8
                            }`}>
                            From
                          </h5>
                          <div className={styles.inputWrapper}>
                            <DatePicker
                              style={{ width: '100%' }}
                              className={styles.formInput}
                              dateFormat="DD-MMM-YYYY"
                              /* minDate={moment()} */
                              maxDate={moment().add(1, 'years')}
                              selected={this.state.from}
                              onChange={this.handleDateChange}
                            />
                          </div>
                        </div>
                        <div className={styles.formItemRowChild}>
                          <h5
                            className={`${styles.formFieldLabel} ${
                              mainStyles.marginBottom8
                            }`}>
                            To{' '}
                            {/* <span
                              onMouseEnter={this.infoBoxToggleHandler}
                              onMouseLeave={this.infoBoxToggleHandler}
                              className={`${styles.smallText} ${
                                styles.infoTargetText
                              }`}
                            >
                              (weekends are automatically excluded)
                            </span> */}
                          </h5>
                          <div className={styles.inputWrapper}>
                            <DatePicker
                              style={{ width: '100%' }}
                              className={`${styles.formInput} ${
                                styles.disabled
                              }`}
                              dateFormat="DD-MMM-YYYY"
                              disabled={true}
                              minDate={moment()}
                              maxDate={moment().add(1, 'years')}
                              selected={
                                this.state.noOfDays === '0.5'
                                  ? moment(this.state.from).add(0, 'days')
                                  : this.addWeekdays(
                                      moment(this.state.from),
                                      this.state.noOfDays - 1
                                    )
                              }
                              onChange={this.handleDateChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${mainStyles.marginBottom20} ${
                        styles.formItemWrapper
                      }`}>
                      <div className={styles.inputWrapper}>
                        <div
                          className={cx({
                            radioItem: true,
                            radioItemSelected: this.state.isVacationSelected
                          })}
                          onClick={this.vacationSelectToggler}>
                          <label className={styles.checkBoxWrapper}>
                            <input
                              className={styles.formInput}
                              type="checkbox"
                            />
                            <div
                              className={cx({
                                checkBoxCheckmarkOutline: true,
                                checked: this.state.isVacationSelected
                              })}>
                              <svg
                                className={styles.checkboxCheckmark}
                                name="Checkmark"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" fillRule="evenodd">
                                  <polyline
                                    stroke="#7289da"
                                    strokeWidth="2"
                                    points="3.5 9.5 7 13 15 5"
                                  />
                                </g>
                              </svg>
                            </div>
                          </label>
                          <div className={styles.radioContent}>
                            <div className={styles.title}>
                              Are you on vacation?
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${mainStyles.marginBottom20} ${
                        styles.formItemWrapper
                      }`}>
                      <h5
                        className={cx({
                          formFieldLabel: true,
                          marginBottom8: true,
                          errorLabel: errors.reason
                        })}>
                        Reason
                        {errors.reason ? (
                          <span className={styles.errorMessage}>
                            {' '}
                            - {errors.reason}
                          </span>
                        ) : null}
                      </h5>
                      <div className={styles.inputWrapper}>
                        <input
                          name="reason"
                          type="text"
                          className={cx({
                            formInput: true,
                            formInputError: errors.reason
                          })}
                          onChange={this.inputOnChangeHandler}
                          value={this.state.reason}
                        />
                      </div>
                    </div>
                    <div
                      className={`${mainStyles.marginBottom20} ${
                        styles.formItemWrapper
                      }`}>
                      <h5
                        className={cx({
                          formFieldLabel: true,
                          marginBottom8: true,
                          errorLabel: errors.reason
                        })}>
                        Address for communication{' '}
                        <span className={`${styles.smallText}`}>
                          (if permission is required to go out-of-station)
                        </span>
                        {errors.reason ? (
                          <span className={styles.errorMessage}>
                            {' '}
                            - {errors.reason}
                          </span>
                        ) : null}
                      </h5>
                      <div className={styles.inputWrapper}>
                        <textarea
                          name="reason"
                          className={cx({
                            formInput: true,
                            formInputError: errors.address
                          })}
                          style={{ resize: 'vertical', minHeight: '80px' }}
                          onChange={this.inputOnChangeHandler}
                          value={this.state.address}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className={styles.radioGroup}>{radioList}</div> */}
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

LeaveApplication.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(LeaveApplication));
