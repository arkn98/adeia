import React from 'react';
import styles from './FormInput.module.scss';

const Divider = props => {
  const { isDefault = true, containerStyles = null, style = {} } = props;
  return (
    <div
      style={{ ...style }}
      className={`${styles.divider} ${
        isDefault ? styles.dividerDefault : null
      } ${containerStyles}`}
    />
  );
};

export default Divider;
