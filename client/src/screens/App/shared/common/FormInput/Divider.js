import React from 'react';
import styles from './FormInput.module.scss';

const Divider = props => {
  const { isDefault = true } = props;
  return (
    <div
      className={`${styles.divider} ${
        isDefault ? styles.dividerDefault : null
      }`}
    />
  );
};

export default Divider;
