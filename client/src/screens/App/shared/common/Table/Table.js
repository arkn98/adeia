import React from 'react';
import styles from './Table.module.scss';

const Table = props => {
  const { containerStyles = null, thead = [], striped = false } = props;
  return (
    <div className={containerStyles} style={{ overflowX: 'auto' }}>
      <table className={`${styles.table} ${striped ? styles.striped : null}`}>
        <thead>
          <tr>
            {thead.map((item, index) => {
              return (
                <th style={index === 0 ? { textAlign: 'left' } : null}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

export default Table;
