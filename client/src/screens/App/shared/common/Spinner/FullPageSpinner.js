import React, { Fragment } from 'react';
import styles from './Spinner.module.scss';

const Spinner = props => {
  const { loadingPrimary = false } = props;
  return (
    <Fragment>
      <span
        className={`${styles.spinnerAbsolute} ${
          loadingPrimary ? styles.loadingPrimary : null
        }`}>
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

export default Spinner;
