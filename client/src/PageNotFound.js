import React, { Component } from 'react';
import styles from './Home.module.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PageNotFound extends Component {
  render() {
    return (
      <div style={{ height: '100%' }} className={styles.app}>
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
            <a
              title="GitHub Repo"
              href="https://github.com/arkn98/lms"
              target="_blank"
              rel="noopener noreferrer">
              Report Bugs
            </a>
          </div>
          <div>|</div>
          <div>
            <a
              title="GitHub Repo"
              href="https://github.com/arkn98/lms"
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

PageNotFound.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(PageNotFound));
