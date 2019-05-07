import React from 'react';
import styles from './InfoBox.module.scss';

const InfoBox = props => {
  const {
    topLeftLabel = '',
    topRightLabel = '',
    bottomLabel = '',
    topRightChildren = [],
    topLeftChildren = [],
    bottomChildren = []
  } = props;
  return (
    <div className={styles.infoBoxContainer}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          {topLeftLabel !== '' ? (
            <div className={styles.label}>{topLeftLabel}</div>
          ) : null}
          {topLeftChildren.map((item, index) => (
            <div className={styles.row}>
              {item.title !== '' ? (
                <div className={styles.rowTitle}>{item.title}</div>
              ) : null}
              <div>{item.content}</div>
            </div>
          ))}
        </div>
        {topRightChildren.length !== 0 ? (
          <div className={styles.topRight}>
            {topRightLabel !== '' ? (
              <div className={styles.label}>{topRightLabel}</div>
            ) : null}
            {topRightChildren.map((item, index) => (
              <div className={styles.row}>
                {item.title !== '' ? (
                  <div className={styles.rowTitle}>{item.title}</div>
                ) : null}
                <div>{item.content}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {bottomChildren.length !== 0 ? (
        <div className={styles.bottom}>
          {bottomLabel !== '' ? (
            <div className={styles.label}>{bottomLabel}</div>
          ) : null}
          {bottomChildren.map((item, index) => (
            <div className={styles.row}>
              {item.title !== '' ? (
                <div className={styles.rowTitle}>{item.title}</div>
              ) : null}
              <div>{item.content}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default InfoBox;
