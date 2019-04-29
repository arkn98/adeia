import React, { Fragment } from 'react';
import styles from './Table.module.scss';

const AltTable = props => {
  const {
    containerStyles = null,
    adaptForFullWidth = false,
    thead = [],
    striped = false,
    tbody = []
  } = props;
  return (
    <div className={`${styles.altTableContainer} ${containerStyles}`}>
      <div className={styles.altTable}>
        <div
          className={`${styles.thead} ${
            adaptForFullWidth ? styles.adaptForFullWidth : null
          }`}>
          <div className={styles.headerRow}>
            {thead.map((item, index) => {
              return (
                <Fragment>
                  <div
                    className={styles.columnTitle}
                    style={{ ...item.style }}
                    key={index}>
                    {item.value}
                  </div>
                  {index !== thead.length - 1 ? (
                    <div className={styles.columnSeperator} />
                  ) : null}
                </Fragment>
              );
            })}
          </div>
        </div>
        <div
          className={`${styles.tbody} ${
            adaptForFullWidth ? styles.adaptForFullWidth : null
          }`}>
          {tbody.map(child => {
            return (
              <div
                className={`${styles.row} ${striped ? styles.striped : null}`}>
                {child.map((subchild, index) => (
                  <Fragment>
                    <div
                      className={styles.columnData}
                      style={{ ...thead[index].style, ...subchild.style }}>
                      {subchild.value}
                    </div>
                    {index !== child.length - 1 ? (
                      <div
                        className={`${styles.columnSeperator} ${
                          styles.invisibleSeperator
                        }`}
                      />
                    ) : null}
                  </Fragment>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AltTable;
