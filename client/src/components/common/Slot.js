import React from 'react';
import styles from './tableStyles.module.css';

const Slot = props => {
  return (
    <td
      onClick={props.onClick}
      day={props.day}
      hour={props.hour}
      colSpan={props.colSpan}
      className={styles.hoverableTd}>
      {props.children}
    </td>
  );
};

export default Slot;
