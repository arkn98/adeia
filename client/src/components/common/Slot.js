import React from 'react';
import styles from './tableStyles.module.css';

const Slot = props => {
  let items = [];
  props.children.forEach(item => {
    items.push(item.courseCode);
  });

  return (
    <td
      onClick={props.onClick}
      day={props.day}
      hour={props.hour}
      colSpan={props.colSpan}
      className={styles.hoverableTd}>
      {items.join(' ')}
    </td>
  );
};

export default Slot;
