import React, { Component } from 'react';
import styles from './Home.module.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class PageNotFound extends Component {
  render() {
    const isDarkTheme = this.props.isDarkTheme;
    return (
      <div
        style={{ height: '100%' }}
        className={
          isDarkTheme ? `${styles.app}` : `${styles.app} ${styles.lightTheme}`
        }>
        <div className={styles.banner}>
          <div
            className={styles.title}
            style={{
              fontWeight: '800',
              fontSize: '60px',
              paddingBottom: '12px'
            }}>
            404
          </div>
          <div className={styles.text}>
            We can't find the page that you're looking for :[
          </div>
          <div className={styles.buttons}>
            <div
              onClick={() => {
                this.props.history.goBack();
              }}>
              <div
                style={{ flex: '1 1 auto' }}
                className={`${styles.buttonPrimary} ${styles.button}`}>
                Go back
              </div>
            </div>
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
    );
  }
}

PageNotFound.defaultProps = {
  isDarkTheme: true
};

export default withRouter(PageNotFound);
