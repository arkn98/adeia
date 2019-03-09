import React from 'react';
import { ButtonSpinner } from '../Spinner';
import styles from './Button.module.scss';

const ButtonModalPrimary = props => {
  const { isLoading = false, onClick, style = {} } = props;
  return (
    <button
      onClick={onClick}
      style={{ ...style }}
      className={`${styles.buttonModalPrimary} ${styles.lookFilled} ${
        styles.buttonModal
      }`}>
      {isLoading ? <ButtonSpinner loadingPrimary={false} /> : props.children}
    </button>
  );
};

export default ButtonModalPrimary;
