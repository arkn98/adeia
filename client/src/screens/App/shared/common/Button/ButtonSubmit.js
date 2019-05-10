import React from 'react';
import { ButtonSpinner } from '../Spinner';
import styles from './Button.module.scss';

const ButtonSubmit = props => {
  const {
    isLoading = false,
    onClick,
    indexBasedOnClick = false,
    type = 'primary',
    index = undefined,
    style = {},
    className = null,
    disabled = false,
    sizeSmall = false,
    sizeMini = false,
    fitText = false,
    ...rest
  } = props;
  return (
    <button
      onClick={
        isLoading || disabled
          ? null
          : indexBasedOnClick
          ? event => onClick(event, index)
          : onClick
      }
      style={{ ...style }}
      className={`${styles.submitButton} ${
        isLoading || disabled ? styles.disabled : null
      } ${fitText ? styles.fitText : null} ${
        sizeSmall ? styles.sizeSmall : null
      } ${sizeMini ? styles.sizeMini : null} ${className} ${
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
