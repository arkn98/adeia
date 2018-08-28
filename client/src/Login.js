import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.css';

class Login extends Component {
  render() {
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
              <div className={styles.title}>Welcome back!</div>
              <div className={styles.subTitle}>
                We're so excited to see you again!
              </div>
              <div className={styles.block}>
                <div className={styles.marginBottom20}>
                  <div className={styles.inputLabel}>Email</div>
                  <input className={styles.inputField} />
                </div>
                <div>
                  <div className={styles.inputLabel}>Password</div>
                  <input className={styles.inputField} />
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
              </div>
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
  }
}

export default Login;
