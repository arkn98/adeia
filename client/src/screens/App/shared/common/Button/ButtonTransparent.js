import React from 'react';
import { ButtonSpinner } from '../Spinner';
import styles from './Button.module.scss';

const ButtonTransparent = props => {
  const { isLoading = false, onClick, style = {} } = props;
  return (
    <button
      onClick={onClick}
      style={{ ...style }}
      className={styles.buttonTransparent}>
      {isLoading ? <ButtonSpinner loadingPrimary={false} /> : props.children}
    </button>
  );
};

export default ButtonTransparent;
