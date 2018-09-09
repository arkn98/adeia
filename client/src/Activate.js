import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { activateUser } from './actions/authActions';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...styles });

class Activate extends Component {
  state = {
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
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ ...this.state, errors: nextProps.errors });
    }
  };

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    const newUser = {
      email: this.state.email,
      staffId: this.state.staffId,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.activateUser(newUser, this.props.history);
  };

  render = () => {
    const { errors } = this.state;
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
              <div className={styles.title}>Activate your account</div>
              <form onSubmit={this.formSubmitHandler} className={styles.block}>
                <div className={styles.marginBottom20}>
                  <div
                    className={cx({
                      inputLabel: true,
                      errorLabel: errors.staffId
                    })}
                  >
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
                    })}
                  >
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
                    })}
                  >
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
                    })}
                  >
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
                <button type="submit" className={styles.login}>
                  Continue
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
                rel="noopener noreferrer"
              >
                Arun Kumar
              </a>
            </div>
            <div>|</div>
            <div>
              <a
                href="https://github.com/arkn98/lms"
                target="_blank"
                rel="noopener noreferrer"
              >
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
  };
}

Activate.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  activateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { activateUser }
)(withRouter(Activate));
