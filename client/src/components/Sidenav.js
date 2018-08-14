import React from "react";
import styles from "./Sidenav.css";
import { Link, NavLink } from "react-router-dom";

const Sidenav = props => {
  return (
    <div style={{ height: "100%" }}>
      <div className={styles.sideNav}>
        <div className={styles.menu}>
          <div className={styles.logo}>
            <Link to="/dashboard">LMS</Link>
            <div className={styles.customHeaderIcons}>
              <a
                href="https://github.com/arkn98/lms"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className={`icon ion-logo-github ${styles.customHeaderIcon}`}
                />
              </a>
              <Link to="/">
                <i
                  className={`icon ion-md-information-circle ${
                    styles.customHeaderIcon
                  }`}
                />
              </Link>
            </div>
          </div>
          <div className={styles.scrollMenuWrapper}>
            <div className={styles.scroller}>
              <span>
                <div className={styles.menuItem}>
                  <Link to="/">
                    <i className={`icon ion-md-easel ${styles.customIcon}`} />
                    &nbsp;
                    <div
                      style={{ display: "inline" }}
                      className={styles.menuText}
                    >
                      Dashboard
                    </div>
                  </Link>
                </div>
                <header className={styles.menuHeader}>Leaves</header>
                <div className={styles.menuItem}>
                  <Link to="/">
                    <i
                      className={`icon ion-md-list-box ${styles.customIcon}`}
                    />
                    &nbsp;
                    <div
                      style={{ display: "inline" }}
                      className={styles.menuText}
                    >
                      Apply for Leave
                    </div>
                  </Link>
                </div>
                <header className={styles.menuHeader}>Reports</header>
                <div className={styles.menuItem}>
                  <Link to="/">
                    <i className={`icon ion-md-stats ${styles.customIcon}`} />
                    &nbsp;
                    <div
                      style={{ display: "inline" }}
                      className={styles.menuText}
                    >
                      View Reports
                    </div>
                  </Link>
                </div>
                {/* <div className={styles.seperator} /> */}
                <header className={styles.menuHeader}>
                  Notifications - (Count)
                </header>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.userContainer}>asdjfhsaf</div>
      </div>
    </div>
  );
};

export default Sidenav;
