import React from 'react';
import tableStyles from './tableStyles.module.css';
import styles from './slotStyles.module.css';
import PropTypes from 'prop-types';

const Slot = props => {
  let items = [];
  props.children.forEach(item => {
    let obj = {
      courseCode: item.courseCode,
      handlingStaff: item.handlingStaff,
      additionalStaff: item.additionalStaff
    };
    items.push(obj);
  });

  return (
    <td
      onClick={props.onClick}
      day={props.day}
      hour={props.hour}
      colSpan={props.colSpan}
      className={tableStyles.hoverableTd}>
      <div
        hour={props.hour}
        day={props.day}
        className={`${styles.flex} ${styles.col} ${styles.flexMainAxisCenter} ${
          styles.flexCrossAxisCenter
        }`}>
        {items.map((item, index) => {
          return (
            <div day={props.day} hour={props.hour} key={index}>
              {item.courseCode} - {item.handlingStaff} -{' '}
              {item.additionalStaff.join(', ')}
            </div>
          );
        })}
      </div>
    </td>
  );
};

Slot.defaultProps = {
  children: []
};

Slot.propTypes = {
  children: PropTypes.array.isRequired
};

export default Slot;
