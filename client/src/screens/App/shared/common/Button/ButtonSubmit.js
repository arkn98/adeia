import React from 'react';
import { ButtonSpinner } from '../Spinner';
import styles from './Button.module.scss';

const ButtonSubmit = props => {
  const {
    isLoading = false,
    onClick,
    type = 'primary',
    style = {},
    className = null,
    disabled = false,
    sizeSmall = false,
    sizeMini = false,
    ...rest
  } = props;
  return (
    <button
      onClick={isLoading || disabled ? null : onClick}
      style={{ ...style }}
      className={`${styles.submitButton} ${
        isLoading || disabled ? styles.disabled : null
      } ${sizeSmall ? styles.sizeSmall : null} ${
        sizeMini ? styles.sizeMini : null
      } ${className} ${
        type === 'primary'
          ? styles.buttonPrimary
          : type === 'danger'
          ? styles.buttonDanger
          : type === 'white'
          ? styles.buttonWhite
          : null
      }`}
      disabled={isLoading || disabled}
      {...rest}>
      {isLoading ? <ButtonSpinner loadingPrimary={false} /> : null}
      <div
        className={styles.contents}
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {props.children}
      </div>
    </button>
  );
};

export default ButtonSubmit;
