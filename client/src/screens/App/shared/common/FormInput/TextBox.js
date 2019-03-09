import React, { Component } from 'react';
import styles from './FormInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...styles });

class TextBox extends Component {
  setFocus = () => {
    this.textBox.focus();
  };

  render = () => {
    const {
      errors,
      containerStyles = {},
      type = 'text',
      label,
      name,
      inputOnChangeHandler,
      value
    } = this.props;
    return (
      <div className={containerStyles}>
        <div
          className={cx({
            inputLabel: true,
            errorLabel: errors
          })}>
          {label}
          {errors ? (
            <span className={styles.errorMessage}> - {errors}</span>
          ) : null}
        </div>
        <input
          name={name}
          ref={input => {
            this.textBox = input;
          }}
          onChange={inputOnChangeHandler}
          value={value}
          type={type}
          className={cx({
            inputField: true,
            formInputError: errors
          })}
        />
      </div>
    );
  };
}

export default TextBox;
