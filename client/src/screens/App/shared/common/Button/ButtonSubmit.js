import React from 'react';
import { ButtonSpinner } from '../Spinner';
import styles from './Button.module.scss';

const ButtonSubmit = props => {
  const {
    isLoading = false,
    onClick,
    style = {},
    className = null,
    disabled = false,
    ...rest
  } = props;
  return (
    <button
      onClick={onClick}
      style={{ ...style }}
      className={`${styles.submitButton} ${
        disabled ? styles.disabled : null
      } ${className}`}
      {...rest}>
      {isLoading ? <ButtonSpinner loadingPrimary={false} /> : props.children}
    </button>
  );
};

export default ButtonSubmit;
