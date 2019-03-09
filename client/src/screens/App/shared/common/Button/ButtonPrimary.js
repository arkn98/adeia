import React from 'react';
import { ButtonSpinner } from '../Spinner';
import styles from './Button.module.scss';

const ButtonPrimary = props => {
  const { isLoading = false, onClick, style = {} } = props;
  return (
    <button
      onClick={onClick}
      style={{ ...style }}
      className={`${styles.buttonPrimary} ${styles.button}`}>
      {isLoading ? <ButtonSpinner loadingPrimary={false} /> : props.children}
    </button>
  );
};

export default ButtonPrimary;
