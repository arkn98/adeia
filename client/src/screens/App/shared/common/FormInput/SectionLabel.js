import React from 'react';
import styles from './FormInput.module.scss';

const SectionLabel = props => {
  const { label, containerStyles = null } = props;
  return (
    <div
      className={`${styles.sectionLabel} ${
        styles.marginBottom20
      } ${containerStyles}`}>
      {label}
    </div>
  );
};

export default SectionLabel;
