import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.css';
import axios from 'axios';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
  };

  render() {
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
                  className={styles.block}
                >
                  <div className={styles.marginBottom20}>
                    <div className={styles.inputLabel}>Email</div>
                    <input
                      name="email"
                      onChange={this.inputOnChangeHandler}
                      value={this.state.email}
                      className={styles.inputField}
                    />
                  </div>
                  <div>
                    <div className={styles.inputLabel}>Password</div>
                    <input
                      name="password"
                      type="password"
                      onChange={this.inputOnChangeHandler}
                      value={this.state.password}
                      className={styles.inputField}
                    />
                  </div>
                  <button className={styles.link}>Forgot your password?</button>
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
      </div>
    );
  }
}

export default Login;
