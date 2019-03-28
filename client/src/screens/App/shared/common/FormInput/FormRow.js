import React from 'react';
import styles from './FormInput.module.scss';

const FormRow = props => {
  const { containerStyles = null } = props;
  return (
    <div className={`${styles.formItemRow} ${containerStyles}`}>
      {props.children}
    </div>
  );
};

export default FormRow;
