import React, { Fragment } from 'react';
import styles from './Spinner.module.scss';

const ComponentSpinner = props => {
  const { loadingPrimary = false } = props;
  return (
    <Fragment>
      <span className={styles.spinnerRelative}>
        <span
          className={`${styles.spinnerInner} ${
            loadingPrimary ? styles.loadingPrimary : null
          }`}>
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

export default ComponentSpinner;
