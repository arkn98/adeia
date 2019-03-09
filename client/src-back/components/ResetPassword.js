import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Spinner from './common/Spinner';
import axios from 'axios';
import Footer from './common/Footer';
import queryString from 'query-string';

const cx = classNames.bind({ ...styles });

class ResetPassword extends Component {
  state = {
    isSubmitting: false,
    isLoading: true,
    password: '',
    password2: '',
    user: {},
    transitionEnd: false,
    errors: {},
    shouldDisplay: false
  };

  componentDidMount = () => {
    if (this.state.shouldDisplay) {
      setTimeout(() => {
        this.newPasswordInput.focus();
      }, 250);
    }

    setTimeout(() => {
      this.setState({
        ...this.state,
        transitionEnd: true
      });
    }, 0);
  };

  /* static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  };

  componentDidUpdate = nextProps => {
    const { errors } = this.state;
    if (errors !== nextProps.errors) {
      this.setState({
        ...this.state,
        isSubmitting: false
      });
    }
  }; */

  componentWillReceiveProps = nextProps => {
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

  resetPasswordHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();

    const newObj = {
      token: queryString.parse(this.props.location.search).token,
      staffId: this.state.user.staffId,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.resetPassword(newObj, this.props.history);
  };

  componentWillMount = () => {
    const parsed = queryString.parse(this.props.location.search);
    const token = parsed.token;
    setTimeout(() => {
      axios
        .get('/api/users/check-reset-token', {
          params: {
            token: token
          }
        })
        .then(res => {
          console.log(res.data);
          this.setState({
            ...this.state,
            shouldDisplay: res.data.status,
            isLoading: false,
            user: res.data.status ? res.data.user : {}
          });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            isLoading: false,
            shouldDisplay: false
          });
          console.log(err);
        });
    }, 1000);
  };

  clearResetToken = event => {
    event.preventDefault();
    this.props.clearResetToken();
    this.props.history.push('/login');
  };

  render() {
    const { errors, shouldDisplay, isLoading } = this.state;

    let toRender = null;
    if (!isLoading) {
      if (shouldDisplay) {
        toRender = (
          <div
            id="authbox"
            className={
              this.state.transitionEnd
                ? `${styles.authbox} ${styles.authboxTransitionEnd}`
                : styles.authbox
            }>
            <div className={styles.logo} style={{ marginBottom: '64px' }}>
              <Link to="/">LMS</Link>
            </div>
            <div className={styles.title}>Reset your password</div>
            <div className={styles.subTitle}>
              {this.state.user.name} - {this.state.user.email}
            </div>
            <form onSubmit={this.loginSubmitHandler} className={styles.block}>
              <div className={styles.marginBottom20}>
                <div
                  className={cx({
                    inputLabel: true,
                    errorLabel: errors.password
                  })}>
                  New Password
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
                  autoFocus
                  ref={input => {
                    this.newPasswordInput = input;
                  }}
                  onChange={this.inputOnChangeHandler}
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
                  type="password"
                  onChange={this.inputOnChangeHandler}
                  value={this.state.password2}
                  className={cx({
                    inputField: true,
                    formInputError: errors.password2
                  })}
                />
              </div>
              <button
                onClick={this.resetPasswordHandler}
                className={
                  this.state.isSubmitting
                    ? `${styles.submitButton} ${styles.submitting}`
                    : `${styles.submitButton}`
                }>
                {this.state.isSubmitting ? (
                  <Spinner isInButton={true} />
                ) : (
                  <div className={styles.contents}>Reset Password</div>
                )}
              </button>
              <div className={styles.marginTop4}>
                <span className={styles.needAccount}>Know your password?</span>
                <button
                  type="button"
                  className={`${styles.smallLink} ${styles.link}`}
                  onClick={this.clearResetToken}>
                  Login here
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
            <div className={styles.logo} style={{ marginBottom: '64px' }}>
              <Link to="/">LMS</Link>
            </div>
            <div className={styles.title}>Password reset link has expired</div>
            {/* <div className={styles.subTitle}>
              Please submit a reset request from the login page to continue
            </div> */}
            <form
              onSubmit={this.activateSubmitHandler}
              className={styles.block}>
              <Link to="/login">
                <button
                  className={
                    this.state.isSubmitting
                      ? `${styles.submitButton} ${styles.submitting}`
                      : `${styles.submitButton}`
                  }>
                  {this.state.isSubmitting ? (
                    <Spinner isInButton={true} />
                  ) : (
                    <div className={styles.contents}>Back to Login</div>
                  )}
                </button>
              </Link>
            </form>
          </div>
        );
      }
    } else {
      toRender = (
        <div
          id="authbox"
          className={
            this.state.transitionEnd
              ? `${styles.authbox} ${styles.authboxTransitionEnd}`
              : styles.authbox
          }>
          <div className={styles.logo} style={{ marginBottom: '64px' }}>
            <Link to="/">LMS</Link>
          </div>
          <div className={styles.title}>Authorizing...</div>
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

ResetPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  utils: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  sendResetEmail: PropTypes.func.isRequired,
  setLoginAttempts: PropTypes.func.isRequired,
  activateUser: PropTypes.func.isRequired
};

export default ResetPassword;
