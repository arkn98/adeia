import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Login.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { activateUser } from './actions/authActions';
import { createProfile } from './actions/profileActions';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...styles });

class Activate extends Component {
  state = {
    isSubmitting: false,
    email: '',
    staffId: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    setTimeout(() => {
      this.staffIdInput.focus();
    }, 250);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({
        ...this.state,
        errors: nextProps.errors,
        isSubmitting: false
      });
    }
  };

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();

    const newUser = {
      email: this.state.email,
      staffId: this.state.staffId,
      password: this.state.password,
      password2: this.state.password2
    };

    const newProfile = {
      staffId: this.state.staffId,
      prevLogins: {},
      cplCredits: 0,
      leaveAllotted: {}
    };

    //this.props.createProfile(newProfile);
    this.props.activateUser(newUser, newProfile, this.props.history);
  };

  render = () => {
    const { errors } = this.state;
    const { isDarkTheme } = this.props.utils;

    return (
      <div
        className={
          isDarkTheme ? styles.root : `${styles.root} ${styles.lightTheme}`
        }>
        <div className={styles.app}>
          <div className={styles.banner}>
            <div className={styles.logo}>
              <Link to="/">LMS</Link>
            </div>
            <div className={styles.authbox}>
              <div className={styles.logo}>
                <Link to="/">LMS</Link>
              </div>
              <div className={styles.title}>Activate your account</div>
              <form onSubmit={this.formSubmitHandler} className={styles.block}>
                <div className={styles.marginBottom20}>
                  <div
                    className={cx({
                      inputLabel: true,
                      errorLabel: errors.staffId
                    })}>
                    Staff ID
                    {errors.staffId ? (
                      <span className={styles.errorMessage}>
                        {' '}
                        - {errors.staffId}
                      </span>
                    ) : null}
                  </div>
                  <input
                    name="staffId"
                    ref={input => {
                      this.staffIdInput = input;
                    }}
                    onChange={this.inputOnChangeHandler}
                    value={this.state.staffId}
                    className={cx({
                      inputField: true,
                      formInputError: errors.staffId
                    })}
                  />
                </div>
                <div className={styles.marginBottom20}>
                  <div
                    className={cx({
                      inputLabel: true,
                      errorLabel: errors.email
                    })}>
                    Email
                    {errors.email ? (
                      <span className={styles.errorMessage}>
                        {' '}
                        - {errors.email}
                      </span>
                    ) : null}
                  </div>
                  <input
                    name="email"
                    onChange={this.inputOnChangeHandler}
                    value={this.state.email}
                    className={cx({
                      inputField: true,
                      formInputError: errors.email
                    })}
                  />
                </div>
                <div className={styles.marginBottom20}>
                  <div
                    className={cx({
                      inputLabel: true,
                      errorLabel: errors.password
                    })}>
                    Password
                    {errors.password ? (
                      <span className={styles.errorMessage}>
                        {' '}
                        - {errors.password}
                      </span>
                    ) : null}
                  </div>
                  <input
                    name="password"
                    onChange={this.inputOnChangeHandler}
                    type="password"
                    value={this.state.password}
                    className={cx({
                      inputField: true,
                      formInputError: errors.password
                    })}
                  />
                </div>
                <div className={styles.marginBottom20}>
                  <div
                    className={cx({
                      inputLabel: true,
                      errorLabel: errors.password2
                    })}>
                    Confirm Password
                    {errors.password2 ? (
                      <span className={styles.errorMessage}>
                        {' '}
                        - {errors.password2}
                      </span>
                    ) : null}
                  </div>
                  <input
                    name="password2"
                    onChange={this.inputOnChangeHandler}
                    type="password"
                    value={this.state.password2}
                    className={cx({
                      inputField: true,
                      formInputError: errors.password2
                    })}
                  />
                </div>
                {/* 
                <button type="submit" className={styles.login}>
                  Continue
                </button> */}
                <button
                  className={
                    this.state.isSubmitting
                      ? `${styles.login} ${styles.submitting}`
                      : `${styles.login}`
                  }>
                  {this.state.isSubmitting ? (
                    <span className={styles.spinner}>
                      <span className={styles.spinnerInner}>
                        <span
                          className={`${styles.pulsingEllipsisItem} ${
                            styles.spinnerItem
                          }`}
                        />
                        <span
                          className={`${styles.pulsingEllipsisItem} ${
                            styles.spinnerItem
                          }`}
                        />
                        <span
                          className={`${styles.pulsingEllipsisItem} ${
                            styles.spinnerItem
                          }`}
                        />
                      </span>
                    </span>
                  ) : (
                    <div className={styles.contents}>Continue</div>
                  )}
                </button>
                <div className={styles.marginTop4}>
                  <div className={`${styles.smallLink} ${styles.link}`}>
                    <Link to="/login">Already have an account?</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.footer}>
            <div>
              Currently maintained by&nbsp;
              <a
                title="My GitHub user page"
                href="https://github.com/arkn98"
                target="_blank"
                rel="noopener noreferrer">
                Arun Kumar
              </a>
            </div>
            <div>|</div>
            <div>
              <a
                title="GitHub repo"
                href="https://github.com/arkn98/lms"
                target="_blank"
                rel="noopener noreferrer">
                View Source Code
              </a>
            </div>
            <div>|</div>
            <div>
              <a
                title="Issue Tracker"
                href="https://github.com/arkn98/lms/issues"
                target="_blank"
                rel="noopener noreferrer">
                Report an issue
              </a>
            </div>
            <div>|</div>
            <div>
              <a
                title="Submit your feedback"
                href="https://goo.gl/forms/NP0pqpHuDlRYGoz92"
                target="_blank"
                rel="noopener noreferrer">
                Feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

Activate.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  utils: PropTypes.object.isRequired,
  activateUser: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  utils: state.utils
});

export default connect(
  mapStateToProps,
  { activateUser, createProfile }
)(withRouter(Activate));
