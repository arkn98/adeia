import React, { Fragment, Component } from 'react';
import styles from './ProgressBar.module.scss';
import formStyles from '../FormInput/FormInput.module.scss';
import { Description } from '../FormInput';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...styles, ...formStyles });

class ProgressBar extends Component {
  state = {
    transitionEnd: false
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ ...this.state, transitionEnd: true });
    }, 0);
  };

  render = () => {
    const {
      containerStyles = {},
      descriptionStyles = {},
      infoText = null,
      label = null,
      description = '',
      bigLabel = false,
      barWidth = 100,
      trackWidth = 100
    } = this.props;

    let widthPercent = (barWidth / trackWidth) * 100;
    widthPercent = widthPercent.toFixed(0);

    return (
      <div className={containerStyles}>
        {label !== null ? (
          <div
            className={cx({
              inputLabel: !bigLabel,
              formFieldLabel: bigLabel,
              marginBottom8: bigLabel || description === ''
            })}>
            {label}
            {infoText !== null ? (
              <Fragment>
                {' '}
                <span className={formStyles.infoText}>{infoText}</span>
              </Fragment>
            ) : null}
          </div>
        ) : null}
        {description !== '' ? (
          <Description containerStyles={descriptionStyles}>
            {description}
          </Description>
        ) : null}
        <div className={styles.container}>
          <div
            className={
              this.state.transitionEnd
                ? `${styles.inner} ${styles.innerTransitionEnd}`
                : styles.inner
            }
            style={{ width: `${widthPercent}%` }}
          />
        </div>
      </div>
    );
  };
}

export default ProgressBar;
