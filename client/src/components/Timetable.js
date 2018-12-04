import React, { Component } from 'react';
import mainStyles from './Main.module.css';
import styles from './LeaveApplication.module.css';
import loginStyles from '../Login.module.css';
import tableStyles from './common/tableStyles.module.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCurrentRouteTitle } from '../actions/utilActions';
import classNames from 'classnames/bind';
import axios from 'axios';
import Temp from './temp';

const cx = classNames.bind({ ...mainStyles, ...styles, ...loginStyles });

class Timetable extends Component {
  state = {
    isSubmitting: false,
    errors: {},
    classCode: '',
    classesList: null,
    isTouched: false,
    isTableLoaded: false,
    timetable: null
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

  onBlur = event => {
    this.setState({ ...this.state, isTouched: true });
  };

  formSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();
  };

  componentWillMount = () => {
    axios
      .get('/api/timetable/get-classes')
      .then(res => {
        this.setState({
          ...this.state,
          classesList: res.data,
          classCode: res.data[0].classCode
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  touched = false;

  inputOnChangeHandler = event => {
    if (event.target.name === 'classCode') {
      let timetableObj = null;
      if (this.touched === false) this.touched = true;
      if (event.target.value !== '') {
        axios
          .post('/api/timetable/get-timetable', event.target.value)
          .then(res => {
            timetableObj = res.data;
          })
          .catch(err => {
            timetableObj = null;
            console.log(err);
          });
      }
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
        isTouched: this.touched,
        timetable: timetableObj
      });
    } else this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const errors = this.state.errors;
    const isDarkTheme = this.props.isDarkTheme;

    const showTimetable = this.state.classCode === '' ? false : true;

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
                      {this.state.classesList === null ? (
                        <option>Loading...</option>
                      ) : (
                        this.state.classesList.map(item => (
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
                <Temp />
                {showTimetable && this.state.isTableLoaded ? (
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
                    <h6 className={tableStyles.title}>Table Title</h6>
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
                          <td />
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
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td style={{ textAlign: 'left' }}>Wednesday</td>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td style={{ textAlign: 'left' }}>Thursday</td>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td style={{ textAlign: 'left' }}>Friday</td>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : !this.state.isTableLoaded && this.state.isTouched ? (
                  'Loading'
                ) : null}
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
  timetable: PropTypes.object.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired,
  getAllClasses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle }
)(withRouter(Timetable));
