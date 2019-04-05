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
    ...rest
  } = props;
  return (
    <button
      onClick={onClick}
      style={{ ...style }}
      className={`${styles.submitButton} ${disabled ? styles.disabled : null} ${
        sizeSmall ? styles.sizeSmall : null
      } ${className} ${
        type === 'primary'
          ? styles.buttonPrimary
          : type === 'danger'
          ? styles.buttonDanger
          : type === 'white'
          ? styles.buttonWhite
          : null
      }`}
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
