import React from 'react';
import styles from './FormInput.module.scss';

const SectionLabel = props => {
  const {
    label,
    uppercase = true,
    containerStyles = null,
    bigLabel = true
  } = props;
  return (
    <div
      className={`${styles.sectionLabel} ${
        styles.marginBottom20
      } ${containerStyles} ${uppercase ? styles.uppercase : null} ${
        !bigLabel ? styles.smallSectionLabel : null
      }`}>
      {label}
    </div>
  );
};

export default SectionLabel;
