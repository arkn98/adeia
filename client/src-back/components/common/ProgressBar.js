import React, { Component } from 'react';
import styles from './progressBarStyles.module.css';

class ProgressBar extends Component {
  /* state = {
    transitionEnd: false
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ ...this.state, transitionEnd: true });
    }, 0);
  }; */

  render = () => {
    let widthPercent = (this.props.barWidth / this.props.trackWidth) * 100;
    widthPercent = widthPercent.toFixed(0);
    return (
      <div className={styles.container}>
        <div
          className={
            /* this.state.transitionEnd
              ?  */ `${styles.inner} ${
              styles.innerTransitionEnd
            }`
            /* : styles.inner */
          }
          style={{ width: `${widthPercent}%` }}
        />
      </div>
    );
  };
}

export default ProgressBar;
