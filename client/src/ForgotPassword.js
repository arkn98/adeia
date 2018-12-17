import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Login.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPassword } from './actions/authActions';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind({ ...styles });

class ForgotPassword extends Component {
  state = {
    isSubmitting: false,
    password: '',
    password2: '',
    errors: {},
    shouldDisplay: false,
    user: {}
  };

  componentDidMount = () => {
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

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentWillMount = () => {
    const token = this.props.match.params.token;
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
          user: res.data.status ? res.data.user : {}
        });
      })
      .catch(err => console.log(err));
  };

  formSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();

    const newObj = {
      token: this.props.match.params.token,
      staffId: this.state.user.staffId,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.resetPassword(newObj, this.props.history);
  };

  render = () => {
    const { errors } = this.state;
    if (this.state.shouldDisplay === true) {
      return (
        <div className={styles.root}>
          <div className={styles.app}>
            <div className={styles.dummy}>
              <div className={styles.banner}>
                <div className={styles.logo}>
                  <Link to="/">LMS</Link>
                </div>
                <div className={styles.authbox}>
                  <div className={styles.logo}>
                    <Link to="/">LMS</Link>
                  </div>
                  <div className={styles.title}>Reset your password</div>
                  <div className={styles.subTitle}>
                    {this.state.user.name} - {this.state.user.email}
                  </div>
                  <form
                    onSubmit={this.formSubmitHandler}
                    className={styles.block}>
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
                      <span className={styles.needAccount}>
                        Know your password?
                      </span>
                      <div className={`${styles.smallLink} ${styles.link}`}>
                        <Link to="/login">Login here</Link>
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
        </div>
      );
    } else {
      return (
        <div style={{ width: '100%', height: '100%', background: '#36393f' }}>
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
        </div>
      );
    }
  };
}

ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(withRouter(ForgotPassword));
