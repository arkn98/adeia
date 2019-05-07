import React from 'react';
import styles from './Badge.module.scss';

const IconBadge = props => {
  const { notifCount = 0 } = props;
  let digitLength = notifCount.toString().length;

  return (
    <div
      className={`${styles.iconBadgeWrapper} ${styles.iconBadge}`}
      style={digitLength > 1 ? { right: '-6px' } : null}>
      {notifCount}
    </div>
  );
};

export default IconBadge;
