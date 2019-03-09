import React from 'react';
import styles from './buttonStyles.module.css';

const Button = props => {
  return (
    <button onClick={props.onClick} className={styles.button}>
      abcd
    </button>
  );
};

export default Button;
