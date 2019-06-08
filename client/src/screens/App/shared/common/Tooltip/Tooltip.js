import React from 'react';
import Tippy from '@tippy.js/react';
import styles from './Tooltip.module.scss';

Tippy.defaultProps = {
  ...Tippy.defaultProps,
  arrow: true,
  animateFill: false,
  animation: '',
  className: styles.tooltip,
  boundary: 'viewport',
  delay: 0,
  duration: 0,
  distance: 16
};

const Tooltip = props => {
  return <Tippy {...props}>{props.children}</Tippy>;
};

export default Tooltip;
