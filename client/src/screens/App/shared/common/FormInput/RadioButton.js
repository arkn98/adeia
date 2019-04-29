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
      sizeSmall = false,
      content = '',
      data = ''
    } = this.props;
    return (
      <div
        data={data}
        name={name}
        className={containerStyles}
        onClick={onClick}>
        <div
          tabIndex="0"
          role="checkbox"
          aria-checked={value}
          name={name}
          data={data}
          className={cx({
            radioItem: true,
            radioItemSelected: value,
            sizeSmall: sizeSmall
          })}>
          <label name={name} data={data} className={styles.checkBoxWrapper}>
            <input
              name={name}
              data={data}
              className={styles.inputField}
              type="checkbox"
            />
            <div
              name={name}
              data={data}
              className={cx({
                checkBoxCheckmarkOutline: true,
                checked: value
              })}>
              <svg
                className={styles.checkboxCheckmark}
                name={name}
                data={data}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg">
                <g name={name} data={data} fill="none" fillRule="evenodd">
                  <polyline
                    name={name}
                    data={data}
                    stroke="#7289da"
                    strokeWidth="2"
                    points="3.5 9.5 7 13 15 5"
                  />
                </g>
              </svg>
            </div>
          </label>
          <div name={name} data={data} className={styles.radioContent}>
            <div name={name} data={data} className={styles.title}>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default RadioButton;
