import React from 'react';
import styles from './Button.module.scss';

const ButtonLink = props => {
  const { isSmall = false, onClick, style = {}, className = null } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${styles.buttonLink} ${
        isSmall ? styles.smallButtonLink : null
      } ${className}`}
      style={{ ...style }}>
      {props.children}
    </button>
  );
};

export default ButtonLink;
