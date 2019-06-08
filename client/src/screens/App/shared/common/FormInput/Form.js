import React from 'react';
import styles from './FormInput.module.scss';

const Form = props => {
  const { onSubmit, fullWidth = false, showBottomSpace = false } = props;
  return (
    <form
      onSubmit={onSubmit}
      className={`${styles.form} ${fullWidth ? styles.formFullWidth : null} ${
        showBottomSpace ? 'paddingBottom80' : null
      }`}>
      {props.children}
    </form>
  );
};

export default Form;
