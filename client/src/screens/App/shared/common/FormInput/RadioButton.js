import React, { Component } from 'react';
import styles from './FormInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...styles });

class RadioButton extends Component {
  render = () => {
    const {
      name,
      containerStyles = {},
      onClick,
      value,
      content = ''
    } = this.props;
    return (
      <div name={name} className={containerStyles} onClick={onClick}>
        <div
          tabIndex="0"
          role="checkbox"
          aria-checked={value}
          name={name}
          className={cx({
            radioItem: true,
            radioItemSelected: value
          })}>
          <label name={name} className={styles.checkBoxWrapper}>
            <input name={name} className={styles.inputField} type="checkbox" />
            <div
              name={name}
              className={cx({
                checkBoxCheckmarkOutline: true,
                checked: value
              })}>
              <svg
                className={styles.checkboxCheckmark}
                name={name}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg">
                <g name={name} fill="none" fillRule="evenodd">
                  <polyline
                    name={name}
                    stroke="#7289da"
                    strokeWidth="2"
                    points="3.5 9.5 7 13 15 5"
                  />
                </g>
              </svg>
            </div>
          </label>
          <div name={name} className={styles.radioContent}>
            <div name={name} className={styles.title}>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default RadioButton;
