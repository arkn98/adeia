import React from 'react';
import styles from './FormInput.module.scss';

const FormRow = props => {
  return <div className={styles.formItemRow}>{props.children}</div>;
};

export default FormRow;
