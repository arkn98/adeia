import React, { Component } from 'react';
import mainStyles from './Main.module.css';
import styles from './LeaveApplication.module.css';
import loginStyles from '../Login.module.css';
import tableStyles from './common/tableStyles.module.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCurrentRouteTitle } from '../actions/utilActions';
import { getTimetable } from '../actions/timetableActions';
import classNames from 'classnames/bind';
import axios from 'axios';
import Select, { createFilter } from 'react-select';
import Slot from './common/Slot';
import { ReactComponent as MdClose } from '../assets/icons/md-close.svg';
import { ReactComponent as MdAdd } from '../assets/icons/md-add.svg';
import { ReactComponent as MdTrash } from '../assets/icons/md-trash.svg';
import Spinner from './common/Spinner';

const cx = classNames.bind({ ...mainStyles, ...styles, ...loginStyles });

class Timetable extends Component {
  state = {
    isSubmitting: false,
    errors: {},
    classCode: '',
    isTableLoaded: false,
    isEntryVisible: false,
    isEditEntry: false,
    entryContent: {
      start: '',
      clickedCol: '',
      duration: '1',
      title: '',
      day: '',
      entry: [
        {
          courseCode: '',
          handlingStaff: '',
          additionalStaff: ''
        },
        {
          courseCode: '',
          handlingStaff: '',
          additionalStaff: ''
        }
      ]
    },
    timetable: [
      [
        {
          start: 1,
          duration: 4,
          course: [
            {
              courseCode: 'CA7001',
              handlingStaff: 'abcd',
              additionalStaff: ['1234', 'sjdfhsdf']
            }
          ]
        }
      ],
      [
        {
          start: 1,
          duration: 4,
          course: [
            {
              courseCode: 'CA7001',
              handlingStaff: 'abcd',
              additionalStaff: ['1234', 'sjdfhsdf']
            }
          ]
        }
      ],
      [
        {
          start: 1,
          duration: 1,
          course: [
            {
              courseCode: 'CA7001',
              handlingStaff: 'abcd',
              additionalStaff: ['1234', 'sjdfhsdf']
            }
          ]
        },
        {
          start: 2,
          duration: 4,
          course: [
            {
              courseCode: 'CA7001',
              handlingStaff: 'abcd',
              additionalStaff: ['1234', 'sjdfhsdf']
            }
          ]
        },
        {
          start: 6,
          duration: 3,
          course: [
            {
              courseCode: 'CA7001',
              handlingStaff: 'abcd',
              additionalStaff: ['1234', 'sjdfhsdf']
            }
          ]
        }
      ],
      [
        {
          start: 1,
          duration: 4,
          course: [
            {
              courseCode: 'CA7001',
              handlingStaff: 'abcd',
              additionalStaff: ['1234', 'sjdfhsdf']
            }
          ]
        }
      ],
      [
        {
          start: 1,
          duration: 4,
          course: [
            {
              courseCode: 'CA7001',
              handlingStaff: 'abcd',
              additionalStaff: ['1234', 'sjdfhsdf']
            },
            {
              courseCode: 'CA7002',
              handlingStaff: 'abcde',
              additionalStaff: ['1234e', 'sjdfhsdfe']
            }
          ]
        }
      ]
    ],
    nameOfClass: ''
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle('Timetable');
  };

  componentWillMount = () => {
    this.setState({
      ...this.state,
      classCode: this.props.classes.classList
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

  formSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();
  };

  entryOnChangeHandler = (event, index) => {
    let arr = this.state.entryContent.entry.slice(0);
    arr[index][event.target.name] = event.target.value;
    this.setState({
      ...this.state,
      entryContent: {
        ...this.state.entryContent,
        entry: arr
      }
    });
  };

  entryCloseHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isEntryVisible: false, isEditEntry: false });
  };

  entryRemoveHandler = (event, index) => {
    event.preventDefault();
    if (!window.confirm('Are you sure you want to remove the entry?')) {
      return;
    }
    let newEntry = this.state.entryContent.entry.splice(0);
    newEntry.splice(index, 1);
    this.setState({
      ...this.state,
      entryContent: { ...this.state.entryContent, entry: newEntry }
    });
  };

  entrySelectOnChangeHandler = (value, index, name) => {
    let arr = this.state.entryContent.entry.slice(0);
    arr[index][name] = value;
    this.setState({
      ...this.state,
      entryContent: {
        ...this.state.entryContent,
        entry: arr
      }
    });
  };

  entryStartDurationHandler = event => {
    this.setState({
      ...this.state,
      entryContent: {
        ...this.state.entryContent,
        [event.target.name]: event.target.value
      }
    });
  };

  inputOnChangeHandler = event => {
    /* if (event.target.name === 'classCode') {
      if (event.target.value !== '') {
        let tempObj = {
          classCode: event.target.value
        };
        this.props.getTimetable(tempObj);
      }
    } */
    this.setState({ [event.target.name]: event.target.value });
  };

  testClickHandler = event => {
    event.preventDefault();
    let newTimetable = {
      classCode: this.state.classCode
    };
    newTimetable.classId = this.props.classes.classList.find(
      x => x.classCode === this.state.classCode
    )._id;

    newTimetable.timetable = this.state.timetable;

    /*
    newTimetable.classCode = 'BT3G';
    newTimetable.classId = this.props.classes.classList.find(
      x => x.classCode === 'BT3G'
    )._id;
    let day = [];
    for (let i = 1; i <= 5; i++) {
      let today = [];
      for (let j = 1; j <= 8; j++) {
        let hour = {};
        hour.courseCode = this.props.courses.courseList.find(
          x => x.courseCode === 'CA7001'
        )._id;
        hour.handlingStaffId = this.props.staff.staffList.find(
          x => x.staffId === '12345'
        )._id;
        hour.additionalStaffId = [];
        hour.additionalStaffId.push(
          this.props.staff.staffList.find(x => x.staffId === '12345')._id
        );
        today.push(hour);
      }
      day.push(today);
    }
    newTimetable.timetable = day;
    */
    console.log(newTimetable);
    /*axios
      .post('/api/timetable/add-timetable', newTimetable)
      .then(timetable => console.log(timetable))
      .catch(err => console.log(err));
      */
  };

  addNewEntry = event => {
    this.setState({
      ...this.state,
      isEntryVisible: true,
      isEditEntry: false,
      entryContent: {
        title: `Add new entry - ${this.days[event.target.getAttribute('day')]}`,
        day: event.target.getAttribute('day'),
        start: event.target.getAttribute('hour'),
        duration: 1,
        entry: [
          {
            courseCode: '',
            handlingStaff: '',
            additionalStaff: ''
          }
        ]
      }
    });
    //this.props.newEntryHandler({});
  };

  editExistingEntry = event => {
    let row = parseInt(event.target.getAttribute('day'));
    let col = parseInt(event.target.getAttribute('hour'));

    //console.log(row);
    //console.log(
    //  this.state.timetable[row].find(x => x.start === parseInt(col)).start
    //);

    //console.log(col);
    let start = this.state.timetable[row].find(x => {
      /* console.log(row);
      console.log(col);
      console.log(x.start); */
      return x.start === col;
    }).start;
    //console.log(start);
    let duration = this.state.timetable[row].find(
      x => x.start === parseInt(col)
    ).duration;
    let courseCode = [];
    this.state.timetable[row]
      .find(x => x.start === parseInt(col))
      .course.map(course => courseCode.push(course.courseCode));
    let handlingStaff = [];
    this.state.timetable[row]
      .find(x => x.start === parseInt(col))
      .course.map(staff => handlingStaff.push(staff.handlingStaff));
    let additionalStaff = [];
    this.state.timetable[row]
      .find(x => x.start === parseInt(col))
      .course.map(addlstaff => additionalStaff.push(addlstaff.additionalStaff));

    let newEntry = [];
    courseCode.forEach((course, index) => {
      let obj = {};
      obj.courseCode = course;
      obj.handlingStaff = handlingStaff[index];
      obj.additionalStaff = additionalStaff[index];
      newEntry.push(obj);
    });

    this.setState({
      ...this.state,
      isEntryVisible: true,
      isEditEntry: true,
      entryContent: {
        title: `Edit entry - ${this.days[row]}`,
        clickedCol: col,
        day: event.target.getAttribute('day'),
        start,
        duration,
        entry: newEntry
      }
    });
  };

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  newEntrySubmitHandler = event => {
    event.preventDefault();
    const newTimetable = this.state.timetable.slice(0);
    let newDay = newTimetable[this.state.entryContent.day].slice(0);

    let course = [];
    this.state.entryContent.entry.forEach((entry, index) => {
      let obj = {};
      obj.courseCode = entry.courseCode;
      obj.handlingStaff = entry.handlingStaff;
      obj.additionalStaff = entry.additionalStaff;
      course.push(obj);
    });

    let newHour = {
      start: parseInt(this.state.entryContent.start),
      duration:
        parseInt(this.state.entryContent.start) +
          parseInt(this.state.entryContent.duration) >
        8
          ? parseInt(this.state.entryContent.duration) -
            (parseInt(this.state.entryContent.start) +
              parseInt(this.state.entryContent.duration) -
              8) +
            1
          : parseInt(this.state.entryContent.duration),
      course
    };

    if (this.state.isEditEntry) {
      let mainIndexToRemove = -1;
      newDay.forEach((item, index) => {
        if (item.start === parseInt(this.state.entryContent.clickedCol)) {
          mainIndexToRemove = index;
        }
      });
      newDay.splice(mainIndexToRemove, 1);

      let hourStart = parseInt(this.state.entryContent.start);
      let hourEnd =
        parseInt(this.state.entryContent.start) +
        parseInt(this.state.entryContent.duration);
      let toRemoveIndexes = [];
      let leftOverlap = -1;
      let rightOverlap = -1;
      newDay.forEach((hour, index) => {
        let tempStart = hour.start;
        let tempEnd = hour.start + hour.duration;
        if (tempStart >= hourStart && tempEnd <= hourEnd) {
          toRemoveIndexes.push(index);
        } else if (hourEnd > tempStart && hourEnd < tempEnd) {
          leftOverlap = index;
        } else if (hourStart >= tempStart && hourStart < tempEnd) {
          rightOverlap = index;
        }
      });

      if (leftOverlap !== -1) {
        newDay[leftOverlap].duration =
          newDay[leftOverlap].duration - (hourEnd - newDay[leftOverlap].start);
        newDay[leftOverlap].start = hourEnd > 8 ? 8 : hourEnd;
      }

      if (rightOverlap !== -1) {
        newDay[rightOverlap].duration =
          newDay[rightOverlap].duration -
          (newDay[rightOverlap].start +
            newDay[rightOverlap].duration -
            hourStart);
      }

      if (toRemoveIndexes.length !== 0) {
        if (
          !window.confirm(
            'Your entry is overlapping with existing entries. Do you wish to proceed?'
          )
        ) {
          return;
        }
        for (let i = toRemoveIndexes.length - 1; i >= 0; i--)
          newDay.splice(toRemoveIndexes[i], 1);
      }

      newDay.splice(newDay.length - 1, 0, newHour);
      newDay.sort((a, b) => a.start - b.start);
      newTimetable[this.state.entryContent.day] = newDay;
      this.setState({
        ...this.state,
        timetable: newTimetable,
        isEntryVisible: false,
        isEditEntry: false,
        entryContent: { entry: [] }
      });
    } else {
      let hourStart = parseInt(this.state.entryContent.start);
      let hourEnd =
        parseInt(this.state.entryContent.start) +
        parseInt(this.state.entryContent.duration);
      let toRemoveIndexes = [];
      let leftOverlap = -1;
      let rightOverlap = -1;
      newDay.forEach((hour, index) => {
        let tempStart = hour.start;
        let tempEnd = hour.start + hour.duration;
        if (tempStart >= hourStart && tempEnd <= hourEnd) {
          toRemoveIndexes.push(index);
        } else if (hourEnd > tempStart && hourEnd < tempEnd) {
          leftOverlap = index;
        } else if (hourStart >= tempStart && hourStart < tempEnd) {
          rightOverlap = index;
        }
      });

      if (leftOverlap !== -1) {
        newDay[leftOverlap].duration =
          newDay[leftOverlap].duration - (hourEnd - newDay[leftOverlap].start);
        newDay[leftOverlap].start = hourEnd > 8 ? 8 : hourEnd;
      }

      if (rightOverlap !== -1) {
        newDay[rightOverlap].duration =
          newDay[rightOverlap].duration -
          (newDay[rightOverlap].start +
            newDay[rightOverlap].duration -
            hourStart);
      }

      if (toRemoveIndexes.length !== 0) {
        if (
          !window.confirm(
            'Your entry is overlapping with existing entries. Do you wish to proceed?'
          )
        ) {
          return;
        }
        for (let i = toRemoveIndexes.length - 1; i >= 0; i--)
          newDay.splice(toRemoveIndexes[i], 1);
      }
      newDay.splice(newDay.length - 1, 0, newHour);
      newDay.sort((a, b) => a.start - b.start);
      newTimetable[this.state.entryContent.day] = newDay;
      this.setState({
        ...this.state,
        timetable: newTimetable,
        isEntryVisible: false,
        isEditEntry: false,
        entryContent: { entry: [] }
      });
    }
  };

  addAdditionalCourseClickHandler = event => {
    event.preventDefault();
    let arr = this.state.entryContent.entry.slice(0);
    arr.push({ courseCode: '', handlingStaff: '', additionalStaff: '' });
    this.setState({
      ...this.state,
      entryContent: { ...this.state.entryContent, entry: arr }
    });
  };

  render() {
    const errors = this.state.errors;
    const isDarkTheme = this.props.isDarkTheme;

    let slots = [];
    this.state.timetable.forEach((row, index) => {
      let hours = [];
      hours.push(<td style={{ textAlign: 'left' }}>{this.days[index]}</td>);
      let tempIndex = 1;
      row.forEach((hour, index2) => {
        if (hour.start !== tempIndex) {
          while (hour.start - tempIndex > 0) {
            hours.push(
              <td
                key={tempIndex}
                onClick={this.addNewEntry}
                day={index}
                hour={tempIndex}
                className={tableStyles.hoverableTd}
              />
            );
            tempIndex++;
          }
        }
        hours.push(
          <Slot
            onClick={this.editExistingEntry}
            day={index}
            hour={tempIndex}
            key={tempIndex}
            colSpan={
              hour.start + hour.duration - tempIndex === 0
                ? 1
                : hour.start + hour.duration - tempIndex
            }>
            {hour.course}
          </Slot>
        );
        tempIndex +=
          hour.start + hour.duration - tempIndex === 0
            ? 1
            : hour.start + hour.duration - tempIndex;
      });
      while (tempIndex < 9) {
        hours.push(
          <td
            key={tempIndex}
            hour={tempIndex}
            day={index}
            onClick={this.addNewEntry}
            className={tableStyles.hoverableTd}
          />
        );
        tempIndex++;
      }
      slots.push(<tr>{hours}</tr>);
    });

    const filterConfig = {
      ignoreCase: true,
      ignoreAccents: true,
      trim: true,
      matchFrom: 'any'
    };

    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        minWidth: '100px'
      }),
      menuList: (provided, state) => ({
        ...provided,
        paddingBottom: 0,
        paddingTop: 0
      }),
      option: (provided, state) => ({
        backgroundColor: 'transparent',
        cursor: 'default',
        display: 'block',
        fontSize: 'inherit',
        textAlign: 'left',
        padding: '6px',
        boxSizing: 'border-box',
        overflowX: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        '&:hover': {
          backgroundColor: 'rgba(79, 84, 92, 0.1)'
        },
        color: '#4f545c'
      }),
      control: (provided, state) => ({
        alignItems: 'left',
        height: '40px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        outline: '0 !important',
        position: 'relative',
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
        backgroundColor: isDarkTheme ? 'rgba(0, 0, 0, 0.1)' : '#fff',
        color: '#fff',
        borderColor: state.isFocused ? '#7289da' : 'rgba(0, 0, 0, 0.3)',
        '&:hover': {
          borderColor: state.isFocused ? '#7289da' : '#040405'
        },
        borderRadius: '3px',
        borderStyle: 'solid',
        borderWidth: '1px',
        boxSizing: 'border-box',
        transition: 'background-color 0.15s ease, border 0.15s ease'
      }),
      singleValue: (provided, state) => ({
        overflow: 'hidden',
        marginLeft: 0,
        position: 'absolute',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        top: '50%',
        transform: 'translateY(-50%)',
        color: isDarkTheme ? 'hsla(0, 0%, 100%, 0.8)' : '#4f545c'
      }),
      input: (provided, state) => ({
        color: isDarkTheme ? '#fff' : '#4f545c'
      }),
      clearIndicator: () => ({
        display: 'none'
      }),
      indicatorSeparator: () => ({
        display: 'none'
      }),
      dropdownIndicator: (provided, state) => ({
        display: 'flex',
        padding: '6px',
        color: isDarkTheme ? '#fff' : '#4f545c',
        opacity: '0.6'
      }),
      valueContainer: (provided, state) => ({
        ...provided,
        width: '50px'
      })
    };

    let courseOptions = [];
    let staffOptions = [];
    if (
      typeof this.props.courses === 'undefined' ||
      (Object.keys(this.props.courses).length === 0 &&
        this.props.courses.constructor === Object) ||
      this.props.courses.courseList === [] ||
      this.props.courses.loading
    ) {
      courseOptions = [];
    } else {
      this.props.courses.courseList
        .filter(item => {
          let found = this.state.entryContent.entry.some(
            entry => item.courseCode === entry.courseCode
          );
          return !found;
        })
        .forEach(item => {
          let temp = {
            value: item.courseCode,
            label: `${item.courseCode} - ${item.nameOfCourse}`
          };

          courseOptions.push(temp);
        });
    }

    if (
      typeof this.props.staff === 'undefined' ||
      (Object.keys(this.props.staff).length === 0 &&
        this.props.staff.constructor === Object) ||
      this.props.staff.staffList === [] ||
      this.props.staff.loading
    ) {
      staffOptions = [];
    } else {
      this.props.staff.staffList
        /* .filter(item => {
          let found = this.state.entryContent.entry.some(
            entry => item.staffId === entry.handlingStaff
          );
          return !found;
        }) */
        .forEach(item => {
          let temp = {
            value: item.staffId,
            label: `${item.staffId} - ${item.name}`
          };

          staffOptions.push(temp);
        });
    }

    let entryStyles = [];
    entryStyles.push(styles.entry);
    entryStyles.push(mainStyles.marginBottom20);
    entryStyles.push(styles.formItemWrapper);

    if (this.state.isEntryVisible) {
      entryStyles.push(styles.entryVisible);
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
                  <h4 className={styles.formTitle}>Timetable</h4>
                  <div className={styles.formSubtitle}>
                    Add/Change timetables from here.
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
                    className={cx({
                      formFieldLabel: true,
                      marginBottom8: true,
                      errorLabel: errors.classCode
                    })}>
                    Class Code
                    {errors.category ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.category}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <select
                      onBlur={this.onBlur}
                      onChange={this.inputOnChangeHandler}
                      name="classCode"
                      value={this.state.classCode}
                      className={cx({
                        formInput: true,
                        formSelect: true,
                        formInputError: errors.classCode
                      })}>
                      <option disabled>Select class code</option>
                      {/* /* typeof this.props.classes === 'undefined' ||
                      ( this
                        .props.classes
                        .loading /* ||
                        /* (Object.keys(this.props.classes).length === 0 &&
                          this.props.classes.constructor === Object)) ||
                      this.props.classes.classList === null ? (
                        <option>Loading...</option>
                      ) : ( */
                      this.props.classes.classList.map((item, index) => (
                        <option key={item.classCode} value={item.classCode}>{`${
                          item.classCode
                        } - ${item.nameOfClass}`}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={entryStyles.join(' ')}>
                  <div
                    className={`${styles.formItemRow} ${
                      mainStyles.marginBottom8
                    }`}>
                    <div
                      className={`${styles.formItemRowChild} ${
                        styles.entryTitleRow
                      }`}>
                      <h5
                        className={cx({
                          formFieldLabel: true,
                          entryTitle: true,
                          marginBottom8: true,
                          errorLabel: errors.classCode
                        })}>
                        {this.state.entryContent.title}
                        {errors.category ? (
                          <span className={loginStyles.errorMessage}>
                            {' '}
                            - {errors.category}
                          </span>
                        ) : null}
                      </h5>
                      <div
                        className={styles.entryIconWrapper}
                        onClick={this.entryCloseHandler}>
                        <MdClose className={styles.customIconTest} />
                      </div>
                    </div>
                    {/* <div
                      className={`${styles.formItemRowChild} ${
                        styles.entryRowChild
                      }`}>
                      <div
                        className={styles.entryIconWrapper}
                        onClick={this.entryCloseHandler}>
                        <MdClose className={styles.customIconTest} />
                      </div>
                    </div> */}
                  </div>
                  <div
                    className={`${styles.formItemRow} ${
                      mainStyles.marginBottom8
                    }`}>
                    <div className={styles.formItemRowChild}>
                      <h5
                        className={`${styles.formFieldLabel} ${
                          mainStyles.marginBottom8
                        }`}>
                        Start Hour
                      </h5>
                      <div className={styles.inputWrapper}>
                        <select
                          onBlur={this.onBlur}
                          onChange={this.entryStartDurationHandler}
                          name="start"
                          value={this.state.entryContent.start}
                          className={cx({
                            formInput: true,
                            formSelect: true,
                            formInputError: errors.classCode
                          })}>
                          <option disabled>Select class code</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.formItemRowChild}>
                      <h5
                        className={`${styles.formFieldLabel} ${
                          mainStyles.marginBottom8
                        }`}>
                        Duration
                      </h5>
                      <div className={styles.inputWrapper}>
                        <input
                          className={`${styles.formInput}`}
                          type="text"
                          onChange={this.entryStartDurationHandler}
                          name="duration"
                          value={this.state.entryContent.duration}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      border: '1px solid rgba(0, 0, 0, 0.3)',
                      borderRadius: '5px',
                      padding: '12px 12px 6px 12px'
                    }}
                    className={mainStyles.marginBottom6}>
                    {this.state.entryContent.entry.map((entry, index) => {
                      return (
                        <div
                          className={`${styles.formItemRow} ${
                            mainStyles.marginBottom8
                          }`}>
                          <div
                            className={`${styles.flex} ${styles.col} ${
                              styles.flexMainAxisCenter
                            } ${styles.flexCrossAxisCenter} ${
                              styles.entryNumber
                            }`}>
                            <div className={styles.entryNumberFix}>
                              <h5 className={styles.formFieldLabel}>
                                {index + 1}
                              </h5>
                            </div>
                            <div
                              className={`${styles.flex} ${styles.col} ${
                                styles.flexMainAxisCenter
                              } ${styles.flexCrossAxisStart} ${
                                styles.entryDeleteIcon
                              } ${styles.entryDeleteIconInline}`}>
                              <div
                                className={`${styles.danger} ${
                                  styles.entryIconWrapper
                                } ${styles.entryIconWrapperBig}`}
                                onClick={e =>
                                  this.entryRemoveHandler(e, index)
                                }>
                                <MdTrash
                                  className={`${styles.customIconTest} ${
                                    styles.customIconTestBig
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={styles.formItemRowChild}>
                            <h5
                              className={`${styles.formFieldLabel} ${
                                mainStyles.marginBottom8
                              }`}>
                              Course Code
                            </h5>
                            <div className={styles.inputWrapper}>
                              {/* <input
                              className={`${styles.formInput}`}
                              type="text"
                              onChange={e =>
                                this.entryOnChangeHandler(e, index)
                              }
                              name="courseCode"
                              value={
                                this.state.entryContent.entry[index].courseCode
                              }
                            /> */}
                              <Select
                                name="courseCode"
                                options={courseOptions}
                                isLoading={this.props.classes.loading}
                                isSearchable={true}
                                value={{
                                  value: this.state.entryContent.entry[index]
                                    .courseCode,
                                  label: `${
                                    this.state.entryContent.entry[index]
                                      .courseCode
                                  }`
                                }}
                                onChange={val =>
                                  this.entrySelectOnChangeHandler(
                                    val.value,
                                    index,
                                    'courseCode'
                                  )
                                }
                                placeholder="Course..."
                                styles={customStyles}
                                className={tableStyles.selectContainer}
                                filterOption={createFilter(filterConfig)}
                              />
                            </div>
                          </div>
                          <div className={styles.formItemRowChild}>
                            <h5
                              className={`${styles.formFieldLabel} ${
                                mainStyles.marginBottom8
                              }`}>
                              Handling Staff
                            </h5>
                            <div className={styles.inputWrapper}>
                              <input
                                className={`${styles.formInput}`}
                                type="text"
                                onChange={e =>
                                  this.entryOnChangeHandler(e, index)
                                }
                                name="handlingStaff"
                                value={
                                  this.state.entryContent.entry[index]
                                    .handlingStaff
                                }
                              />
                            </div>
                          </div>
                          <div className={styles.formItemRowChild}>
                            <h5
                              className={`${styles.formFieldLabel} ${
                                mainStyles.marginBottom8
                              }`}>
                              Additional Staff
                            </h5>
                            <div className={styles.inputWrapper}>
                              <input
                                className={`${styles.formInput}`}
                                type="text"
                                onChange={e =>
                                  this.entryOnChangeHandler(e, index)
                                }
                                name="additionalStaff"
                                value={
                                  this.state.entryContent.entry[index]
                                    .additionalStaff
                                }
                              />
                            </div>
                          </div>
                          <div
                            className={`${styles.flex} ${styles.col} ${
                              styles.flexMainAxisCenter
                            } ${styles.flexCrossAxisStart} ${
                              styles.entryDeleteIcon
                            }`}>
                            <div
                              className={`${styles.danger} ${
                                styles.entryIconWrapper
                              } ${styles.entryIconWrapperBig}`}
                              onClick={e => this.entryRemoveHandler(e, index)}>
                              <MdTrash
                                className={`${styles.customIconTest} ${
                                  styles.customIconTestBig
                                }`}
                              />
                            </div>
                          </div>
                          <div
                            className={`${styles.formItemRowChild} ${
                              styles.flex
                            } ${styles.col} ${styles.flexMainAxisEnd} ${
                              styles.flexCrossAxisStart
                            }`}>
                            <div className={styles.inputWrapper}>
                              {this.state.entryContent.entry.length ===
                              index + 1 ? (
                                <button
                                  type="submit"
                                  onClick={this.newEntrySubmitHandler}
                                  className={styles.primaryButton}>
                                  {this.state.isSubmitting ? (
                                    <Spinner
                                      isDarkTheme={isDarkTheme}
                                      isStripped={true}
                                    />
                                  ) : (
                                    <div className={styles.contents}>
                                      {' '}
                                      {this.state.isEditEntry
                                        ? `Update`
                                        : `Add`}
                                    </div>
                                  )}
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div
                      className={styles.formItemRow}
                      onClick={this.addAdditionalCourseClickHandler}>
                      <div className={styles.addNewEntry}>
                        <MdAdd className={styles.customIconTest} />
                      </div>
                    </div>
                  </div>
                  {/* <div
                    className={styles.formItemRow}
                    onClick={this.addAdditionalCourseClickHandler}>
                    <div className={styles.addNewEntry}>
                      <MdAdd className={styles.customIconTest} />
                    </div>
                  </div> */}
                </div>
                <div className={styles.infoBox}>
                  Click on the cells to add/update slots in the timetable.
                </div>
                <div
                  onClick={this.testClickHandler}
                  style={{ cursor: 'pointer' }}>
                  click me
                </div>
                <div
                  className={
                    isDarkTheme
                      ? `${mainStyles.marginBottom20} ${
                          styles.formItemWrapper
                        } ${tableStyles.timetable}`
                      : `${mainStyles.marginBottom20} ${
                          styles.formItemWrapper
                        } ${tableStyles.timetable} ${tableStyles.lightTheme}`
                  }>
                  {/* <h6 className={tableStyles.title}>
                    {this.props.classes.loading ||
                    this.props.classes.classList === null
                      ? 'Loading'
                      : this.state.nameOfClass}
                  </h6> */}
                  <table>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left' }}>Day</th>
                        <th>Ⅰ</th>
                        <th>Ⅱ</th>
                        <th>Ⅲ</th>
                        <th>Ⅳ</th>
                        <th>Ⅴ</th>
                        <th>Ⅵ</th>
                        <th>Ⅶ</th>
                        <th>Ⅷ</th>
                      </tr>
                    </thead>
                    <tbody>{slots}</tbody>
                  </table>
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
                      style={{ borderRadius: '5px' }}
                      type="submit"
                      className={loginStyles.login}>
                      {this.state.isSubmitting ? (
                        <span className={loginStyles.spinner}>
                          <span className={loginStyles.spinnerInner}>
                            <span
                              className={`${loginStyles.pulsingEllipsisItem} ${
                                loginStyles.spinnerItem
                              }`}
                            />
                            <span
                              className={`${loginStyles.pulsingEllipsisItem} ${
                                loginStyles.spinnerItem
                              }`}
                            />
                            <span
                              className={`${loginStyles.pulsingEllipsisItem} ${
                                loginStyles.spinnerItem
                              }`}
                            />
                          </span>
                        </span>
                      ) : (
                        <div className={loginStyles.contents}>Add Class</div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Timetable.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired,
  timetable: PropTypes.object.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired,
  getTimetable: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  /* auth: state.auth,
  errors: state.errors,
  profile: state.profile,
  classes: state.classes,
  courses: state.courses,
  staff: state.staff,
  timetable: state.timetable */
});

Timetable.defaultProps = {
  classes: {
    classList: [],
    loading: false
  }
};

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, getTimetable }
)(withRouter(Timetable));
