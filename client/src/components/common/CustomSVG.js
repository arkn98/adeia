import React from 'react';
import styles from './Sidenav.module.css';

const CustomSVG = props => {
  return (
    <img
      width={`${props.width}px`}
      src={require(`../../assets/icons/${props.name}.svg`)}
      className={props.className}
    />
  );
};

export default CustomSVG;
