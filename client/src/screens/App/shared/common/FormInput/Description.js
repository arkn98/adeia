import React from 'react';
import styles from './FormInput.module.scss';

const Description = props => {
  const { containerStyles = {} } = props;
  const isContainerStylesProvided = !(
    Object.keys(containerStyles).length === 0 &&
    containerStyles.constructor === Object
  );
  return (
    <div
      className={`${styles.description} ${
        isContainerStylesProvided ? containerStyles : styles.marginBottom8
      }`}>
      {props.children}
    </div>
  );
};

export default Description;
