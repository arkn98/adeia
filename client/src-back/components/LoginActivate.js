import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from './Login.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Spinner from './common/Spinner';
import Footer from './common/Footer';

const cx = classNames.bind({ ...styles });

const initialState = {
  isSubmitting: false,
  email: '',
  password: '',
  password2: '',
  staffId: '',
  transitionEnd: false,
  bgTransitionEnd: false,
  errors: {}
};

class LoginActivate extends Component {
  state = initialState;

  componentDidMount = () => {
    const element = document.getElementById('spinnerContainer');
    if (element) {
      element.outerHTML = '';
    }

    if (!this.props.isAuthenticated) {
      if (typeof this.emailInput !== 'undefined')
        setTimeout(() => {
          this.emailInput.focus();
        }, 250);
      if (typeof this.staffIdInput !== 'undefined')
        setTimeout(() => {
          this.staffIdInput.focus();
        }, 250);
    }

    setTimeout(() => {
      this.setState({
        ...this.state,
        transitionEnd: true,
        bgTransitionEnd: true
      });
    }, 0);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        ...this.state,
        errors: nextProps.errors,
        isSubmitting: false
      });
    } /*  else {
      this.setState({
        ...this.state,
        isSubmitting: false
      });
    } */
  };

  inputOnChangeHandler = event => {
    if (event.target.name === 'email')
      this.setState({ [event.target.name]: event.target.value.toLowerCase() });
    else this.setState({ [event.target.name]: event.target.value });
  };

  activateSubmitHandler = event => {
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

    this.props.activateUser(newUser, newProfile, this.props.history);
  };

  forgotPasswordHandler = event => {
    event.preventDefault();
    const state = this.state;
    this.setState({ ...state, isSubmitting: true });
    this.props.sendResetEmail({ email: state.email });
  };

  componentWillUnmount = () => {
    this.props.clearErrors();
  };

  loginSubmitHandler = event => {
    event.preventDefault();
    const state = this.state;
    const { location } = this.props;
    this.setState({ ...state, isSubmitting: true });
    this.props.loginUser(
      { email: state.email, password: state.password },
      this.props.history,
      typeof location.state === 'undefined'
        ? undefined
        : location.state.destination
    );
  };

  render() {
    const { errors } = this.state;
    const { isAuthenticated, history, match } = this.props;

    if (isAuthenticated) return <Redirect to="/dashboard" />;

    let toRender = null;
    if (match.path === '/login') {
      toRender = (
        <div
          id="authbox"
          className={
            this.state.transitionEnd
              ? `${styles.authbox} ${styles.authboxTransitionEnd}`
              : styles.authbox
          }>
          <div className={styles.logo}>
            <Link to="/">LMS</Link>
          </div>
          <div className={styles.title}>Welcome back!</div>
          <div className={styles.subTitle}>
            We're so excited to see you again!
          </div>
          <form onSubmit={this.loginSubmitHandler} className={styles.block}>
            <div className={styles.marginBottom20}>
              <div
                className={cx({
                  inputLabel: true,
                  errorLabel: errors.email
                })}>
                Email
                {errors.email ? (
                  <span className={styles.errorMessage}> - {errors.email}</span>
                ) : null}
              </div>
              <input
                name="email"
                ref={input => {
                  this.emailInput = input;
                }}
                onChange={this.inputOnChangeHandler}
                value={this.state.email}
                className={cx({
                  inputField: true,
                  formInputError: errors.email
                })}
              />
            </div>
            <div>
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
                type="password"
                onChange={this.inputOnChangeHandler}
                value={this.state.password}
                className={cx({
                  inputField: true,
                  formInputError: errors.password
                })}
              />
            </div>
            <button
              onClick={this.forgotPasswordHandler}
              type="button"
              className={styles.link}>
              Forgot your password?
            </button>
            <button
              className={
                this.state.isSubmitting
                  ? `${styles.submitButton} ${styles.submitting}`
                  : `${styles.submitButton}`
              }>
              {this.state.isSubmitting ? (
                <Spinner isInButton={true} />
              ) : (
                <div className={styles.contents}>Login</div>
              )}
            </button>
            <div className={styles.marginTop4}>
              <span className={styles.needAccount}>Account not activated?</span>
              <button
                type="button"
                className={`${styles.smallLink} ${styles.link}`}
                onClick={() => {
                  this.props.clearErrors();
                  this.setState({
                    ...this.state,
                    transitionEnd: false,
                    path: '/activate'
                  });
                  history.push('/activate');
                  this.forceUpdate();
                }}>
                Activate here
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      toRender = (
        <div
          id="authbox"
          className={
            this.state.transitionEnd
              ? `${styles.authbox} ${styles.authboxTransitionEnd}`
              : styles.authbox
          }>
          <div className={styles.logo}>
            <Link to="/">LMS</Link>
          </div>
          <div className={styles.title}>Activate your account</div>
          {/* <div className={styles.subTitle}>
            We're so excited to see you again!
          </div> */}
          <form onSubmit={this.activateSubmitHandler} className={styles.block}>
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
                  <span className={styles.errorMessage}> - {errors.email}</span>
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
            <button
              className={
                this.state.isSubmitting
                  ? `${styles.submitButton} ${styles.submitting}`
                  : `${styles.submitButton}`
              }>
              {this.state.isSubmitting ? (
                <Spinner isInButton={true} />
              ) : (
                <div className={styles.contents}>Activate</div>
              )}
            </button>
            <div className={styles.marginTop4}>
              <span className={styles.needAccount}>
                Account already activated?
              </span>
              <button
                type="button"
                className={`${styles.smallLink} ${styles.link}`}
                onClick={() => {
                  this.props.clearErrors();
                  this.setState({
                    ...this.state,
                    transitionEnd: false,
                    path: '/login'
                  });
                  this.forceUpdate();
                  history.push('/login');
                }}>
                Login here
              </button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className={styles.root}>
        <div className={styles.app}>
          <div className={styles.dummy}>
            <div className={styles.banner}>
              <div className={styles.logo}>
                <Link to="/">LMS</Link>
              </div>
              {toRender}
            </div>
            <Footer altStyle={true} />
          </div>
        </div>
      </div>
    );
  }
}

LoginActivate.propTypes = {
  auth: PropTypes.object.isRequired,
  utils: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  sendResetEmail: PropTypes.func.isRequired,
  setLoginAttempts: PropTypes.func.isRequired,
  activateUser: PropTypes.func.isRequired
};

export default LoginActivate;
