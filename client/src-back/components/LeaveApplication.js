import React, { Component, Fragment } from 'react';
import mainStyles from './Main.module.css';
import styles from './LeaveApplication.module.css';
import loginStyles from '../components/Login.module.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Spinner from './common/Spinner';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './common/datePickerStyles.css';
import _ from 'underscore';

const cx = classNames.bind({ ...mainStyles, ...styles });

moment().local();

const leaveString = [
  'Select a leave type',
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

const options = {
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

class LeaveApplication extends Component {
  state = {
    isSubmitting: false,
    isInfoBoxVisible: false,
    staffId: this.props.auth.user.staffId,
    name: this.props.auth.user.name,
    designation: this.props.auth.user.designation,
    leaveType: leaveString[options[this.props.auth.user.staffType].type[1]],
    noOfDays: '1',
    from: null,
    to: null,
    isVacationSelected: false,
    reason: '',
    addressForCommunication: '',
    showAvailableLeaves: false,
    availableLeaves: '',
    toAlternate: [],
    isHalfDaySelected: false,
    isReady: false,
    selectedSlots: [[], [], [], [], []]
  };

  inputOnChangeHandler = event => {
    event.preventDefault();
    let obj = {};
    if (event.target.value === 'noOfDays') {
      obj.isReady = false;
    }
    this.setState({ ...obj, [event.target.name]: event.target.value });
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

  toggleVacationSelect = () => {
    this.setState({
      ...this.state,
      isVacationSelected: !this.state.isVacationSelected
    });
  };

  toggleHalfDaySelect = () => {
    this.setState({
      ...this.state,
      isHalfDaySelected: !this.state.isHalfDaySelected
    });
  };

  vacationSelectToggler = event => {
    this.toggleVacationSelect();
  };

  halfDaySelectToggler = event => {
    this.toggleHalfDaySelect();
  };

  infoBoxToggleHandler = event => {
    this.setState({
      ...this.state,
      isInfoBoxVisible: !this.state.isInfoBoxVisible
    });
  };

  getSlotsToAlternate = () => {
    let to =
      this.state.noOfDays === '0.5'
        ? moment(this.state.from)
        : this.addWeekdays(this.state.from, parseInt(this.state.noOfDays) - 1);
    let toAlternateState = [];
    for (
      let m = moment(this.state.from);
      m.diff(to, 'days') <= 0;
      m.add(1, 'days')
    ) {
      if (
        this.props.leave.toAlternate.findIndex(
          x => x.day === parseInt(m.day())
        ) !== -1
      ) {
        let temp = {
          option: '',
          date: m.format('DD-MM-YYYY'),
          alternate: null,
          postpone: null
        };
        toAlternateState.push(temp);
      }
    }
    this.setState({
      ...this.state,
      toAlternate: toAlternateState,
      isReady: true
    });
  };

  handleDateChange = date => {
    if (moment().isAfter(date, 'day'))
      alert("Please note: You are selecting a date prior to today's date");
    this.setState({
      ...this.state,
      from: date,
      isReady: false
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        ...this.state,
        errors: nextProps.errors,
        isSubmitting: false
      });
    }
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (
      this.state.from !== prevState.from ||
      this.state.noOfDays !== prevState.noOfDays
    )
      this.getSlotsToAlternate();
  };

  alternationOptionChangeHandler = (index, event) => {
    event.preventDefault();
    let newArr = this.state.toAlternate.slice(0);
    newArr[index].option = event.target.value;
    if (newArr[index].option === 'postpone') {
      newArr[index].postpone = [];
      newArr[index].alternate = null;
      let date = moment(this.state.toAlternate[index].date, 'DD-MM-YYYY');
      let dayTimetable = this.props.leave.toAlternate.find(
        x => x.day === parseInt(date.day())
      );
      for (let i = 1; i <= dayTimetable.duration; i++) {
        newArr[index].postpone.push({
          date: null,
          day: null,
          hour: null,
          duration: 1
        });
      }
    } else {
      newArr[index].postpone = null;
      newArr[index].alternate = '';
    }
    this.setState({ ...this.state, toAlternate: newArr });
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle('Leave Application');
  };

  formSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();

    const newLeave = {
      staffId: this.state.staffId,
      name: this.state.name,
      designation: this.state.designation,
      leaveType: this.state.leaveType,
      noOfDays: this.state.noOfDays,
      from: this.state.from,
      to: this.state.to,
      isVacationSelected: this.state.isVacationSelected,
      reason: this.state.reason,
      addressForCommunication: this.state.addressForCommunication
    };

    this.props.addLeave(newLeave, this.props.history);
  };

  /*
  0 - select a leave type
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
      this.setState({ ...this.state, selectedRadio: opt });
    }
  };

  postponeDateChange = (index, postponeIndex, date) => {
    let newToAlternate = this.state.toAlternate.slice(0);
    newToAlternate[index].postpone[postponeIndex].date = date.format(
      'DD-MM-YYYY'
    );
    newToAlternate[index].postpone[postponeIndex].day = moment(
      newToAlternate[index].postpone[postponeIndex].date,
      'DD-MM-YYYY'
    ).day();
    this.setState({ ...this.state, toAlternate: newToAlternate });
  };

  postponeHourChange = (index, day, postponeIndex, event) => {
    let newToAlternate = this.state.toAlternate.slice(0);
    let newSelectedSlots = this.state.selectedSlots.slice(0);
    if (!newSelectedSlots[day].includes(parseInt(event.target.value))) {
      newSelectedSlots[day].push(parseInt(event.target.value));
    }
    if (newToAlternate[index].postpone[postponeIndex].hour !== null) {
      let tempindex = newSelectedSlots[day].indexOf(
        newToAlternate[index].postpone[postponeIndex].hour
      );
      if (tempindex !== -1) newSelectedSlots[day].splice(tempindex, 1);
    }
    newToAlternate[index].postpone[postponeIndex].hour = parseInt(
      event.target.value
    );
    /* if (newToAlternate[index].postpone[postponeIndex].hour !== null) {
      let tempindex = newSelectedSlots[day].indexOf(
        parseInt(newToAlternate[index].postpone[postponeIndex].hour)
      );
      if (tempindex !== -1) {
        newSelectedSlots[day].splice(tempindex, 1);
      }
    }
    newToAlternate[index].postpone[postponeIndex].hour = event.target.value;
    if (
      newSelectedSlots[day].includes(
        newToAlternate[index].postpone[postponeIndex].hour
      ) === false
    ) {
      newSelectedSlots[day].push(event.target.value);
    } */
    this.setState({
      ...this.state,
      toAlternate: newToAlternate,
      selectedSlots: newSelectedSlots
    });
  };

  render() {
    const { errors, leave } = this.props;
    const optList = options[this.props.auth.user.staffType].type.map(
      (leaveType, index) => {
        if (index === 0)
          return (
            <option disabled key={leaveType}>
              {leaveString[leaveType]}
            </option>
          );
        else return <option key={leaveType}>{leaveString[leaveType]}</option>;
      }
    );
    const isDarkTheme = this.props.isDarkTheme;

    const postponeHourList = [];
    for (let i = 0, l = this.props.freeHours.length; i < l; i++) {
      let temp = _.difference(
        this.props.freeHours[i],
        this.state.selectedSlots[i].map(x => parseInt(x))
      );
      console.log(/* 'props ' + i +  */ this.props.freeHours[i]);
      console.log(/* 'state ' + i +  */ this.state.selectedSlots[i]);
      postponeHourList.push(temp);
    }
    console.log(/* 'final ' +  */ postponeHourList);
    //console.log('diffcheck ' + _.difference([2, 3, 4, 5, 6, 7, 8], [2]));

    const toAlternateTable = [];
    if (
      this.state.isReady &&
      this.state.from !== null &&
      leave.toAlternate.length !== 0
    ) {
      this.state.toAlternate.forEach((stateItem, i) => {
        let m = moment(stateItem.date, 'DD-MM-YYYY');
        let index = leave.toAlternate.findIndex(
          x => x.day === parseInt(m.day())
        );
        if (index !== -1) {
          let item = leave.toAlternate[index];
          let startHour = item.hour;
          toAlternateTable.push(
            <div className={styles.alternationRow}>
              <div className={styles.alternationRowChild}>
                <div>
                  <span className={styles.title}>Date</span>
                  <span>{m.format('DD-MMM-YYYY - dddd')}</span>
                </div>
                <div>
                  <span className={styles.title}>Class</span>
                  <span>{item.class.nameOfClass}</span>
                </div>
                <div>
                  <span className={styles.title}>Hour</span>
                  <span>{item.hour}</span>
                </div>
                <div>
                  <span className={styles.title}>Duration</span>
                  <span>{item.duration}</span>
                </div>
              </div>
              <div className={styles.alternationRowChild}>
                <div>
                  <select
                    onChange={event =>
                      this.alternationOptionChangeHandler(i, event)
                    }
                    name="option"
                    value={stateItem.option}
                    className={cx({
                      formInput: true,
                      formSelect: true,
                      formInputError: errors.leaveType
                    })}
                    defaultChecked="">
                    <option value="" disabled>
                      Select option
                    </option>
                    <option value="alternate">Alternate</option>
                    <option value="postpone">Postpone</option>
                  </select>
                </div>
                {this.state.isReady ? (
                  stateItem.option === 'postpone' &&
                  Array.isArray(stateItem.postpone) ? (
                    <Fragment>
                      <div className={styles.postponeDurationRow}>
                        <div className={styles.postponeDurationRowLabel}>
                          Hour
                        </div>
                        <div
                          className={styles.postponeDurationRowDateContainer}>
                          Postpone Date
                        </div>
                        <div
                          className={styles.postponeDurationRowHourContainer}>
                          Postpone Hour
                        </div>
                      </div>
                      {stateItem.postpone.map((postponeitem, postponeIndex) => {
                        return (
                          <div className={styles.postponeDurationRow}>
                            <div className={styles.postponeDurationRowLabel}>
                              {startHour + postponeIndex}
                            </div>
                            <div
                              className={
                                styles.postponeDurationRowDateContainer
                              }>
                              <DatePicker
                                style={{ width: '100%' }}
                                className={styles.formInput}
                                dateFormat="DD-MMM-YYYY"
                                maxDate={moment().add(1, 'years')}
                                selected={
                                  postponeitem.date === null
                                    ? null
                                    : moment(postponeitem.date, 'DD-MM-YYYY')
                                }
                                onChange={date =>
                                  this.postponeDateChange(
                                    i,
                                    postponeIndex,
                                    date
                                  )
                                }
                                placeholderText="Click to select a date"
                                showDisabledMonthNavigation
                              />
                            </div>
                            <div
                              className={
                                styles.postponeDurationRowHourContainer
                              }>
                              <select
                                onChange={event =>
                                  this.postponeHourChange(
                                    i,
                                    moment(stateItem.date, 'DD-MM-YYYY').day() -
                                      1,
                                    postponeIndex,
                                    event
                                  )
                                }
                                name="option"
                                /* value={postponeitem.hour} */
                                className={cx({
                                  formInput: true,
                                  formSelect: true,
                                  formInputError: errors.leaveType
                                })}>
                                <option value="">Select option</option>
                                {/*postponeitem.hour !== null ? (
                                  <option value={postponeitem.hour}>
                                    {postponeitem.hour}
                                  </option>
                                ) : null*/}
                                {postponeitem.hour === null
                                  ? postponeHourList[
                                      moment(
                                        stateItem.date,
                                        'DD-MM-YYYY'
                                      ).day() - 1
                                    ].map(x => {
                                      return <option value={x}>{x}</option>;
                                    })
                                  : _.union(
                                      postponeHourList[
                                        moment(
                                          stateItem.date,
                                          'DD-MM-YYYY'
                                        ).day() - 1
                                      ],
                                      [postponeitem.hour]
                                    )
                                      .sort()
                                      .map(x => {
                                        return <option value={x}>{x}</option>;
                                      })}
                                {/* <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option> */}
                                {/*postponeHourList*/}
                              </select>
                            </div>
                          </div>
                        );
                      })}
                    </Fragment>
                  ) : stateItem.option === 'alternate' ? (
                    <Fragment>
                      <div className={styles.postponeDurationRow}>
                        <div className={styles.alternationStaffChoice}>
                          Alternatives
                        </div>
                        <div className={styles.alternationStaffChoice}>
                          Others
                        </div>
                      </div>
                    </Fragment>
                  ) : null
                ) : null}
              </div>
            </div>
          );
        }
      });
    }

    return (
      <div
        className={
          isDarkTheme
            ? `${mainStyles.scrollWrapper}`
            : `${mainStyles.scrollWrapper} ${mainStyles.lightTheme} ${
                styles.lightTheme
              }`
        }>
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
              <form
                onSubmit={this.formSubmitHandler}
                className={styles.formBody}>
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
                      value={this.state.staffId}
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
                      value={this.state.name}
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
                      value={this.state.designation}
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
                      errorLabel: errors.leaveType
                    })}>
                    Leave Type
                    {errors.leaveType ? (
                      <span className={styles.errorMessage}>
                        {' '}
                        - {errors.leaveType}
                      </span>
                    ) : null}
                  </h5>
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}>
                    <select
                      onChange={this.inputOnChangeHandler}
                      name="leaveType"
                      value={this.state.leaveType}
                      className={cx({
                        formInput: true,
                        formSelect: true,
                        formInputError: errors.leaveType
                      })}>
                      {optList}
                    </select>
                  </div>
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}>
                    <div className={styles.formItemRow}>
                      {/* <div className={styles.formItemRowChild}>
                        <h5
                          className={`${styles.formFieldLabel} ${
                            mainStyles.marginBottom8
                          }`}>
                          &nbsp;
                        </h5>
                        <div className={styles.inputWrapper}>
                          <div
                            tabIndex="0"
                            role="checkbox"
                            aria-checked={this.state.isHalfDaySelected}
                            className={cx({
                              radioItem: true,
                              radioItemSelected: this.state.isHalfDaySelected
                            })}
                            style={{height:'40px', padding: '8px'}}
                            onClick={this.halfDaySelectToggler}>
                            <label className={styles.checkBoxWrapper}>
                              <input
                                className={styles.formInput}
                                type="checkbox"
                              />
                              <div
                                className={cx({
                                  checkBoxCheckmarkOutline: true,
                                  checked: this.state.isHalfDaySelected
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
                              <div className={styles.title}>Half day?</div>
                            </div>
                          </div>
                        </div>
                      </div> */}

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
                            //onBlur={this.noOfDaysOnBlurHandler}
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
                            placeholderText="Click to select a date"
                            showDisabledMonthNavigation
                          />
                        </div>
                      </div>
                      <div className={styles.formItemRowChild}>
                        <h5
                          className={`${styles.formFieldLabel} ${
                            styles.enforceSingleRow
                          } ${mainStyles.marginBottom8}`}>
                          To
                          <span className={`${styles.smallText}`}>
                            &nbsp; (weekends are automatically excluded)
                          </span>
                        </h5>
                        <div className={styles.inputWrapper}>
                          <DatePicker
                            style={{ width: '100%' }}
                            className={`${styles.formInput} ${styles.disabled}`}
                            dateFormat="DD-MMM-YYYY"
                            disabled={true}
                            /* minDate={moment()} */
                            maxDate={moment().add(1, 'years')}
                            selected={
                              this.state.from !== null
                                ? this.state.noOfDays === '0.5'
                                  ? this.state.from
                                  : this.addWeekdays(
                                      this.state.from,
                                      parseInt(this.state.noOfDays) - 1
                                    )
                                : null
                            }
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
                        tabIndex="0"
                        role="checkbox"
                        aria-checked={this.state.isVacationSelected}
                        className={cx({
                          radioItem: true,
                          radioItemSelected: this.state.isVacationSelected
                        })}
                        onClick={this.vacationSelectToggler}>
                        <label className={styles.checkBoxWrapper}>
                          <input className={styles.formInput} type="checkbox" />
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
                          <div className={styles.title}>Is it a vacation?</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.from === null ||
                  leave.toAlternate.length === 0 ? null : (
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
                        Duty Alteration
                        {errors.reason ? (
                          <span className={styles.errorMessage}>
                            {' '}
                            - {errors.reason}
                          </span>
                        ) : null}
                      </h5>
                      <div className={styles.alternationWrapper}>
                        {toAlternateTable}
                      </div>
                      {/* <div
                        className={`${styles.formItemWrapper} ${
                          tableStyles.timetable
                        }`}>
                        <table>
                          <thead>
                            <tr>
                              <th style={{ textAlign: 'left' }}>Date</th>
                              <th style={{ textAlign: 'left' }}>Class</th>
                              <th style={{ textAlign: 'left' }}>Hour</th>
                              <th style={{ textAlign: 'left' }}>Duration</th>
                              <th
                                style={{
                                  textAlign: 'left',
                                  width: '50%'
                                }}>
                                Alteration
                              </th>
                            </tr>
                          </thead>
                          <tbody>{toAlternateTable}</tbody>
                        </table>
                      </div> */}
                    </div>
                  )}
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
                        errorLabel: errors.addressForCommunication
                      })}>
                      Address for communication{' '}
                      <span className={`${styles.smallText}`}>
                        (if permission is required to go out-of-station)
                      </span>
                      {errors.addressForCommunication ? (
                        <span className={styles.errorMessage}>
                          {' '}
                          - {errors.addressForCommunication}
                        </span>
                      ) : null}
                    </h5>
                    <div className={styles.inputWrapper}>
                      <textarea
                        name="addressForCommunication"
                        className={cx({
                          formInput: true,
                          formInputError: errors.addressForCommunication
                        })}
                        style={{ resize: 'vertical', minHeight: '80px' }}
                        onChange={this.inputOnChangeHandler}
                        value={this.state.addressForCommunication}
                      />
                    </div>
                  </div>
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}>
                    <div
                      className={`${styles.inputWrapper} ${
                        mainStyles.marginTop8
                      }`}>
                      <button
                        type="submit"
                        className={
                          this.state.isSubmitting
                            ? `${loginStyles.submitButton} ${
                                loginStyles.submitting
                              }`
                            : `${loginStyles.submitButton}`
                        }>
                        {this.state.isSubmitting ? (
                          <Spinner isInButton={true} />
                        ) : (
                          <div className={loginStyles.contents}>
                            Submit Application
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
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
    );
  }
}

LeaveApplication.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired,
  addLeave: PropTypes.func.isRequired
};

LeaveApplication.defaultProps = {
  leave: {
    loading: false,
    toAlternate: []
  }
};

export default LeaveApplication;
