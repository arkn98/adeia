import React from 'react';
import styles from './tableStyles.module.css';
import PropTypes from 'prop-types';

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

Slot.defaultProps = {
  children: []
};

export default Slot;
