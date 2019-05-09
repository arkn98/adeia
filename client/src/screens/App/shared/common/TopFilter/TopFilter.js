import React, { Component } from 'react';
import styles from './TopFilter.module.scss';

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  const tempA = a.slice(0).sort();
  const tempB = b.slice(0).sort();

  for (var i = 0; i < tempA.length; ++i) {
    if (tempA[i] !== tempB[i]) return false;
  }
  return true;
};

class TopFilter extends Component {
  render = () => {
    const {
      label = null,
      currentFilter,
      filters = [],
      containerStyles = null
    } = this.props;
    return (
      <div className={`${styles.filterWrapper} ${containerStyles}`}>
        {label !== null ? (
          <div className={styles.filterLabel}>{label}</div>
        ) : null}
        {filters.map(item => {
          return (
            <div
              className={`${styles.filterItem} ${
                arraysEqual(item.value, currentFilter) ? styles.selected : null
              }`}
              onClick={() => item.onClick(item.value)}>
              {item.name}
            </div>
          );
        })}
      </div>
    );
  };
}

export default TopFilter;
