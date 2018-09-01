import React, { Component } from 'react';
import styles from './Main.css';
import { Link, NavLink } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.topBarWrapper}>
          <div className={styles.topBar}>
            <div className={styles.pageTitle}>Dashboard</div>
            <div className={styles.headerIcons}>
              {/* <div className={styles.searchBarWrapper}>
                <div className={styles.searchBar}>
                  <div className={styles.search} />
                </div>
              </div>
              <div className={styles.seperator} /> */}
              <div className={styles.iconWrapper}>
                <a
                  title="GitHub Repo"
                  href="https://github.com/arkn98/lms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className={`icon ion-md-notifications ${
                      styles.customHeaderIcon
                    }`}
                  />
                </a>
              </div>
              <div className={styles.iconWrapper}>
                <a
                  title="GitHub Repo"
                  href="https://github.com/arkn98/lms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className={`icon ion-md-help ${styles.customHeaderIcon}`}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.scrollWrapper}>
          <div className={styles.contentWrapper}>
            <div className={styles.body}>
              <div className={`${styles.welcomeMessage} ${styles.marginTop20}`}>
                Welcome, {`\{username\}`}
              </div>
              <div className={`${styles.boxContainer} ${styles.marginTop20}`}>
                <div className={`${styles.box} ${styles.boxHover}`}>
                  <div className={styles.boxIcon}>
                    <i
                      className={`icon ion-md-cash ${styles.customHeaderIcon}`}
                    />
                  </div>
                  <div className={styles.boxText}>
                    <div className={styles.title}>CPL Credits</div>
                    <div className={styles.subtitle}>
                      Check available CPL credits
                    </div>
                  </div>
                </div>
                <div className={`${styles.box} ${styles.boxHover}`}>
                  <div className={styles.boxIcon}>
                    <i
                      className={`icon ion-md-checkbox-outline ${
                        styles.customHeaderIcon
                      }`}
                    />
                  </div>
                  <div className={styles.boxText}>
                    <div className={styles.title}>Leave Status</div>
                    <div className={styles.subtitle}>
                      Check status of applied leaves
                    </div>
                  </div>
                </div>{' '}
                <div className={`${styles.box} ${styles.boxHover}`}>
                  <div className={styles.boxIcon}>
                    <i
                      className={`icon ion-md-construct ${
                        styles.customHeaderIcon
                      }`}
                    />
                  </div>
                  <div className={styles.boxText}>
                    <div className={styles.title}>Awaiting Alterations</div>
                    <div className={styles.subtitle}>
                      Check the alternations given to you
                    </div>
                  </div>
                </div>{' '}
                <div className={`${styles.box} ${styles.boxHover}`}>
                  <div className={styles.boxIcon}>
                    <i
                      className={`icon ion-md-repeat ${
                        styles.customHeaderIcon
                      }`}
                    />
                  </div>
                  <div className={styles.boxText}>
                    <div className={styles.title}>Compensations</div>
                    <div className={styles.subtitle}>
                      Check the list of compensations
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.boxContainer} ${styles.mainFuncs}`}>
                <div className={styles.box}>
                  <div className={styles.boxText}>
                    <div className={styles.title}>Leave Availability</div>
                    {/* <div className={styles.subtitle}>Leave Availability</div> */}
                  </div>
                  {/* <div className={styles.boxIcon}>
                    <i
                      className={`icon ion-md-repeat ${
                        styles.customHeaderIcon
                      }`}
                    />
                  </div> */}
                </div>
                <div className={styles.box}>
                  <div className={styles.boxText}>
                    <div>
                      <span className={styles.title}>Recent Logins </span>
                      <span className={styles.subtitle}>(approximate)</span>
                    </div>
                  </div>
                  {/* <div className={styles.boxIcon}>
                    <i
                      className={`icon ion-md-repeat ${
                        styles.customHeaderIcon
                      }`}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
