import React, { Component } from 'react';
import mainStyles from './Main.module.css';
import styles from './LeaveApplication.module.css';
import loginStyles from './Login.module.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCourse } from '../actions/classActions';
import { updateCurrentRouteTitle } from '../actions/utilActions';
import classNames from 'classnames/bind';
import Spinner from './common/Spinner';

const cx = classNames.bind({ ...mainStyles, ...styles, ...loginStyles });

class AddCourse extends Component {
  state = {
    isSubmitting: false,
    selectedRadio: 0,
    nameOfCourse: '',
    courseCode: '',
    errors: {}
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle('Add Course');
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

  radioClickHandler = event => {
    let opt = event.target.getAttribute('radio-key');
    if (this.state.selectedRadio !== opt && opt != null) {
      this.setState({ ...this.state, selectedRadio: opt, accountType: opt });
    }
  };

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();

    const data = {
      nameOfCourse: this.state.nameOfCourse,
      courseCode: this.state.courseCode
    };

    this.props.addCourse(data, this.props.history);
  };

  render() {
    const errors = this.state.errors;
    const isDarkTheme = this.props.isDarkTheme;

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
                  <h4 className={styles.formTitle}>Add Course</h4>
                  <div className={styles.formSubtitle}>
                    Add Courses from here.
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
                      errorLabel: errors.courseCode
                    })}
                    /* className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`} */
                  >
                    Course Code
                    {errors.courseCode ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.courseCode}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <input
                      onChange={this.inputOnChangeHandler}
                      name="courseCode"
                      value={this.state.courseCode}
                      className={cx({
                        formInput: true,
                        formInputError: errors.courseCode
                      })}
                      type="text"
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
                      errorLabel: errors.nameOfCourse
                    })}
                    /* className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`} */
                  >
                    Course Name
                    {errors.nameOfCourse ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.nameOfCourse}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <input
                      onChange={this.inputOnChangeHandler}
                      name="nameOfCourse"
                      value={this.state.nameOfCourse}
                      className={cx({
                        formInput: true,
                        formInputError: errors.nameOfCourse
                      })}
                      type="text"
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
                        <Spinner isDarkTheme={isDarkTheme} isInButton={true} />
                      ) : (
                        <div className={loginStyles.contents}>Add Course</div>
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

AddCourse.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addCourse: PropTypes.func.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addCourse, updateCurrentRouteTitle }
)(withRouter(AddCourse));
