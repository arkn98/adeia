import React from 'react';
import { ButtonSpinner } from '../Spinner';
import styles from './Button.module.scss';

const ButtonWhite = props => {
  const { isLoading = false, onClick, style = {} } = props;
  return (
    <button
      onClick={onClick}
      style={{ ...style }}
      className={`${styles.buttonWhite} ${styles.button}`}>
      {isLoading ? <ButtonSpinner loadingPrimary={true} /> : props.children}
    </button>
  );
};

export default ButtonWhite;
