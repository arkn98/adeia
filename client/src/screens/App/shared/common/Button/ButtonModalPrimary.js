import React from 'react';
import { ButtonSpinner } from '../Spinner';
import styles from './Button.module.scss';

const ButtonModalPrimary = props => {
  const { isLoading = false, onClick, style = {}, setRef = null } = props;
  return (
    <button
      onClick={onClick}
      style={{ ...style }}
      ref={element => {
        if (setRef) setRef(element);
      }}
      className={`${styles.buttonModalPrimary} ${styles.lookFilled} ${
        styles.buttonModal
      }`}>
      {isLoading ? <ButtonSpinner loadingPrimary={false} /> : props.children}
    </button>
  );
};

export default ButtonModalPrimary;
