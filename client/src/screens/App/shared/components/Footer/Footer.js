import React from 'react';
import styles from './Footer.module.scss';

const Footer = props => {
  const { altColors = false } = props;
  return (
    <div
      className={
        altColors === false
          ? `${styles.footer}`
          : `${styles.footer} ${styles.footerAltColors}`
      }>
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
          href="https://github.com/arkn98/leave-management-system"
          target="_blank"
          rel="noopener noreferrer">
          View source code
        </a>
      </div>
      <div>|</div>
      <div>
        <a
          title="Issue Tracker"
          href="https://github.com/arkn98/leave-management-system/issues"
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
  );
};

export default Footer;
