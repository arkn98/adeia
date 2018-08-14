import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.css";

class Activate extends Component {
  render() {
    return (
      <div style={{ height: "100%" }} className={styles.app}>
        <div className={styles.banner}>
          <div className={styles.logo}>
            <Link to="/">LMS</Link>
          </div>
          <div className={styles.authbox}>
            <div className={styles.logo}>
              <Link to="/">LMS</Link>
            </div>
            <div className={styles.title}>Activate your account</div>
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
              <button className={styles.login}>Continue</button>
              <div className={styles.marginTop4}>
                <div className={`${styles.smallLink} ${styles.link}`}>
                  <Link to="/login">Already have an account?</Link>
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
    );
  }
}

export default Activate;
