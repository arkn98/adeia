import React, { Component } from "react";
import styles from "./Home.css";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div style={{ height: "100%" }} className={styles.app}>
        <div className={styles.banner}>
          <div className={styles.title}>
            Welcome to LMS - Leave Management System
          </div>
          <div className={styles.text}>
            An all-in-one application to apply for leaves, manage and keep track
            of them
            {/* , that works on both your desktop and phone. */}, for the
            Department of Information Science & Technology.
          </div>
          <div className={styles.buttons}>
            <Link to="/login">
              <div
                style={{ flex: "1 1 auto" }}
                className={`${styles.buttonWhite} ${styles.button}`}
              >
                Login
              </div>
            </Link>
            <Link to="/activate">
              <div
                style={{ flex: "1 1 auto" }}
                className={`${styles.buttonPrimary} ${styles.button}`}
              >
                Activate Account
              </div>
            </Link>
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

export default Home;
