import React from 'react';
import styles from './FormInput.module.scss';

const WidthLimiter = props => {
  const { fullWidth = false, showBottomSpace = false } = props;
  return (
    <div
      className={`${styles.form} ${fullWidth ? styles.formFullWidth : null} ${
        showBottomSpace ? styles.paddingBottom80 : null
      }`}>
      {props.children}
    </div>
  );
};

export default WidthLimiter;
