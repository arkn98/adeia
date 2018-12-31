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

const cx = classNames.bind({ ...mainStyles, ...styles, ...loginStyles });

class Timetable extends Component {
  state = {
    isSubmitting: false,
    errors: {},
    classCode: '',
    isTableLoaded: false,
    timetable: null,
    nameOfClass: ''
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle('Timetable');
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
    let newTimetable = {};
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
    console.log(newTimetable);
    axios
      .post('/api/timetable/add-timetable', newTimetable)
      .then(timetable => console.log(timetable))
      .catch(err => console.log(err));
  };

  render() {
    const errors = this.state.errors;
    const isDarkTheme = this.props.isDarkTheme;

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
        transform: 'translateY(-50%)'
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
      singleValue: (provided, state) => ({
        ...provided,
        color: isDarkTheme ? 'hsla(0, 0%, 100%, 0.8)' : '#4f545c'
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

    let classOptions = [];
    if (
      typeof this.props.courses === 'undefined' ||
      (Object.keys(this.props.courses).length === 0 &&
        this.props.courses.constructor === Object) ||
      this.props.courses.courseList === [] ||
      this.props.courses.loading
    ) {
      classOptions = [];
    } else {
      this.props.courses.courseList.map(item => {
        let temp = {
          value: item.courseCode,
          label: `${item.courseCode} - ${item.nameOfCourse}`
        };
        classOptions.push(temp);
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
                      {typeof this.props.classes === 'undefined' ||
                      (Object.keys(this.props.classes).length === 0 &&
                        this.props.classes.constructor === Object) ||
                      this.props.classes.classList === null ||
                      this.props.classes.loading ? (
                        <option>Loading...</option>
                      ) : (
                        this.props.classes.classList.map(item => (
                          <option
                            key={item.classCode}
                            value={item.classCode}>{`${item.classCode} - ${
                            item.nameOfClass
                          }`}</option>
                        ))
                      )}
                    </select>
                  </div>
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
                    <tbody>
                      <tr>
                        <td style={{ textAlign: 'left' }}>Monday</td>
                        <td>
                          <Select
                            options={classOptions}
                            isLoading={this.props.classes.loading}
                            isSearchable={true}
                            placeholder="Course"
                            isMulti={true}
                            styles={customStyles}
                            className={tableStyles.selectContainer}
                            filterOption={createFilter(filterConfig)}
                          />
                        </td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left' }}>Tuesday</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        {/* <td />
                        <td />
                        <td />
                        <td /> */}
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left' }}>Wednesday</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        {/* 
                        <td />
                        <td />
                        <td />
                        <td /> */}
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left' }}>Thursday</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        {/* <td />
                        <td />
                        <td />
                        <td /> */}
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left' }}>Friday</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        {/* 
                        <td />
                        <td />
                        <td />
                        <td /> */}
                      </tr>
                    </tbody>
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
  classes: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    classList: PropTypes.array.isRequired
  }),
  courses: PropTypes.object.isRequired,
  timetable: PropTypes.object.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired,
  getTimetable: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
  classes: state.classes,
  courses: state.courses,
  staff: state.staff,
  timetable: state.timetable
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, getTimetable }
)(withRouter(Timetable));
