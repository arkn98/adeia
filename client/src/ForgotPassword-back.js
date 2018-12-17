import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Login.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { activateUser } from './actions/authActions';
import { createProfile } from './actions/profileActions';
import classNames from 'classnames/bind';
import axios from 'axios';
import PageNotFound from './PageNotFound';

const cx = classNames.bind({ ...styles });

class ForgotPassword extends Component {
  state = {
    isSubmitting: false,
    newPassword: '',
    password2: '',
    errors: {},
    shouldDisplay: false
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    setTimeout(() => {
      if (this.newPasswordInput) this.newPasswordInput.focus();
    }, 250);
  };

  componentWillReceiveProps = nextProps => {
    /* if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    } */
    if (nextProps.errors) {
      this.setState({
        ...this.state,
        errors: nextProps.errors,
        isSubmitting: false
      });
    }
  };

  componentWillMount = () => {
    const token = this.props.match.params.token;
    //console.log(token);
    axios
      .get('/api/users/check-reset-token', {
        params: {
          token: token
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({ ...this.state, shouldDisplay: res.data.status });
      })
      .catch(err => console.log(err));
  };

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();

    /* const newUser = {
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
    this.props.activateUser(newUser, newProfile, this.props.history); */
  };

  render = () => {
    const { errors } = this.state;
    if (this.state.shouldDisplay === true) {
      return (
        <div className={styles.root}>
          <div className={styles.app}>
            <div className={styles.banner}>
              <div className={styles.logo}>
                <Link to="/">LMS</Link>
              </div>
              <div className={styles.authbox}>
                <div className={styles.logo}>
                  <Link to="/">LMS</Link>
                </div>
                <div className={styles.title}>Reset your password</div>
                <form
                  onSubmit={this.formSubmitHandler}
                  className={styles.block}>
                  <div className={styles.marginBottom20}>
                    <div
                      className={cx({
                        inputLabel: true,
                        errorLabel: errors.newPassword
                      })}>
                      New password
                      {errors.newPassword ? (
                        <span className={styles.errorMessage}>
                          {' '}
                          - {errors.newPassword}
                        </span>
                      ) : null}
                    </div>
                    <input
                      name="newPassword"
                      ref={input => {
                        this.newPasswordInput = input;
                      }}
                      onChange={this.inputOnChangeHandler}
                      value={this.state.newPassword}
                      className={cx({
                        inputField: true,
                        formInputError: errors.newPassword
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
                      value={this.state.password2}
                      className={cx({
                        inputField: true,
                        formInputError: errors.password2
                      })}
                    />
                  </div>
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
                      <div className={styles.contents}>Reset Password</div>
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
                  href="https://github.com/arkn98"
                  target="_blank"
                  rel="noopener noreferrer">
                  Arun Kumar
                </a>
              </div>
              <div>|</div>
              <div>
                <a
                  href="https://github.com/arkn98/lms"
                  target="_blank"
                  rel="noopener noreferrer">
                  View Source Code
                </a>
              </div>
              <div>|</div>
              <div>
                <a href="">Report Bugs</a>
              </div>
              <div>|</div>
              <div>
                <a href="">Feedback</a>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <PageNotFound />;
    }
  };
}

ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  activateUser: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { activateUser, createProfile }
)(withRouter(ForgotPassword));
