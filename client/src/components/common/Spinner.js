import React from 'react';
import styles from './spinnerStyles.module.css';

const Spinner = props => {
  if (typeof props.isStripped !== 'undefined' && props.isStripped === true)
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
  else
    return (
      <div style={props.myStyle}>
        <span
          className={
            props.isDarkTheme
              ? `${styles.spinner}`
              : `${styles.lightTheme} ${styles.spinner}`
          }
          style={{ position: 'absolute', top: '-25%' }}>
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
};

export default Spinner;
