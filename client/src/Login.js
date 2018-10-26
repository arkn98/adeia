import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Login.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from './actions/authActions';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...styles });

class Login extends Component {
  state = {
    isSubmitting: false,
    email: '',
    password: '',
    errors: {}
  };

  abcd = (
    <button
      type="submit"
      class="marginBottom8-AtZOdT button-3k0cO7 button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeLarge-1vSeWK fullWidth-1orjjo grow-q77ONN submitting-3qlO9O">
      <span class="spinner-2enMB9 spinner-3a9zLT">
        <span class="inner-1gJC7_ pulsingEllipsis-3YiXRF">
          <span class="pulsingEllipsisItem-32hhWL spinnerItem-3GlVyU" />
          <span class="pulsingEllipsisItem-32hhWL spinnerItem-3GlVyU" />
          <span class="pulsingEllipsisItem-32hhWL spinnerItem-3GlVyU" />
        </span>
      </span>
      <div class="contents-18-Yxp">Login</div>
    </button>
  );

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ ...this.state, errors: nextProps.errors });
    }
  };

  render() {
    const { errors } = this.state;
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
                <div className={styles.title}>Welcome back!</div>
                <div className={styles.subTitle}>
                  We're so excited to see you again!
                </div>
                <form
                  onSubmit={this.formSubmitHandler}
                  className={styles.block}>
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
                      type="email"
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
                  <button type="button" className={styles.link}>
                    Forgot your password?
                  </button>
                  <button className={styles.login}>Login</button>
                  <div className={styles.marginTop4}>
                    <span className={styles.needAccount}>
                      Account not activated?
                    </span>
                    <div className={`${styles.smallLink} ${styles.link}`}>
                      <Link to="/activate">Activate here</Link>
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
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
