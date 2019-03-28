import React from 'react';
import styles from './Slot.module.scss';
import PropTypes from 'prop-types';

const Slot = props => {
  let items = [];
  props.children.forEach(item => {
    let obj = {
      nameOfCourse: item.nameOfCourse,
      handlingStaff: item.handlingStaff,
      additionalStaff: item.additionalStaff
    };
    items.push(obj);
  });

  return (
    <div
      hour={props.hour}
      day={props.day}
      className={`${styles.flex} ${styles.col} ${styles.flexMainAxisCenter} ${
        styles.flexCrossAxisCenter
      }`}
      style={{ wordBreak: 'normal' }}>
      {items.map((item, index) => {
        return (
          <div
            day={props.day}
            hour={props.hour}
            key={index}
            className={styles.courseContainer}>
            {item.nameOfCourse} - {item.handlingStaff}{' '}
            {(typeof item.additionalStaff === 'string' &&
              item.additionalStaff.length) ||
            (Array.isArray(item.additionalStaff) &&
              item.additionalStaff.length !== 0)
              ? ` - ${
                  Array.isArray(item.additionalStaff)
                    ? item.additionalStaff.join(', ')
                    : item.additionalStaff
                }`
              : null}
          </div>
        );
      })}
    </div>
  );
};

Slot.defaultProps = {
  children: []
};

Slot.propTypes = {
  children: PropTypes.array.isRequired
};

export default Slot;
