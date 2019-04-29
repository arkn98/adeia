import React from 'react';
import styles from './Button.module.scss';

const ButtonSubmitTable = props => {
  const { className, disabled, ...rest } = props;
  return (
    <button
      type="button"
      {...rest}
      className={`${styles.submitButton} ${styles.sizeSmall} ${
        styles.buttonPrimary
      } ${disabled ? styles.disabled : null} ${className}`}>
      {props.children}
    </button>
  );
};

export default ButtonSubmitTable;
