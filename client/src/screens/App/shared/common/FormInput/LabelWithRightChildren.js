import React, { Fragment } from 'react';
import styles from './FormInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...styles });

const LabelWithRightChildren = props => {
  const {
    containerStyles = {},
    infoText = null,
    label,
    bigLabel = false,
    children = null
  } = props;
  return (
    <div
      className={`${styles.formItemRow} ${
        styles.formItemRowCenter
      } ${containerStyles} ${styles.formItemRowPreventColumnOnMobile}`}>
      <div className={styles.entryTitleRow}>
        <div
          className={cx({
            inputLabel: !bigLabel,
            formFieldLabel: bigLabel
          })}
          style={{ flex: '1' }}>
          {label}
          {infoText !== null ? (
            <Fragment>
              {' '}
              <span className={styles.infoText}>{infoText}</span>
            </Fragment>
          ) : null}
        </div>
      </div>
      {children !== null ? (
        <div className={styles.rightAlign}>{children}</div>
      ) : null}
    </div>
  );
};

export default LabelWithRightChildren;
