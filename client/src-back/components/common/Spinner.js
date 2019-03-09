import React from 'react';
import styles from './spinnerStyles.module.css';

const Spinner = props => {
  if (typeof props.isStripped !== 'undefined' && props.isStripped === true)
    return (
      <React.Fragment>
        <span
          className={
            props.isDarkTheme
              ? `${styles.spinnerRelative}`
              : `${styles.lightTheme} ${styles.spinnerRelative}`
          }>
          <span className={styles.spinnerInner}>
            <span
              className={`${styles.pulsingEllipsisItem} ${styles.spinnerItem}`}
            />
            <span
              className={`${styles.pulsingEllipsisItem} ${styles.spinnerItem}`}
            />
            <span
              className={`${styles.pulsingEllipsisItem} ${styles.spinnerItem}`}
            />
          </span>
        </span>
      </React.Fragment>
    );
  else if (
    typeof props.isInButton !== 'undefined' &&
    props.isInButton === true
  ) {
    return (
      <React.Fragment>
        <span className={styles.spinnerAbsolute}>
          <span className={styles.spinnerInner}>
            <span
              className={`${styles.pulsingEllipsisItem} ${styles.spinnerItem}`}
            />
            <span
              className={`${styles.pulsingEllipsisItem} ${styles.spinnerItem}`}
            />
            <span
              className={`${styles.pulsingEllipsisItem} ${styles.spinnerItem}`}
            />
          </span>
        </span>
      </React.Fragment>
    );
  } else {
    let subStyle = {
      position: 'absolute',
      backgroundColor: props.isDarkTheme ? '#2f3136' : null
    };
    if (props.subStyle !== null) {
      subStyle = { ...subStyle, ...props.subStyle };
    }
    return (
      <div style={props.myStyle}>
        <span
          className={
            props.isDarkTheme
              ? `${styles.spinner}`
              : `${styles.lightTheme} ${styles.spinner}`
          }
          style={subStyle}>
          <span className={styles.spinnerInner}>
            <span
              className={`${styles.pulsingEllipsisItem} ${styles.spinnerItem}`}
            />
            <span
              className={`${styles.pulsingEllipsisItem} ${styles.spinnerItem}`}
            />
            <span
              className={`${styles.pulsingEllipsisItem} ${styles.spinnerItem}`}
            />
          </span>
        </span>
      </div>
    );
  }
};

Spinner.defaultProps = {
  isDarkTheme: false
};

export default Spinner;
