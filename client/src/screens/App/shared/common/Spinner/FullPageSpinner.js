import React, { Fragment } from 'react';
import styles from './Spinner.module.scss';

const Spinner = props => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Spinner;
