import React, { Component, Fragment } from 'react';
import styles from './FormInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...styles });

class FileUpload extends Component {
  setFocus = () => {
    this.textBox.focus();
  };

  render = () => {
    const {
      errors,
      containerStyles = {},
      infoText = null,
      type = 'file',
      label,
      name,
      inputOnChangeHandler,
      value,
      bigLabel = false,
      disabled = false
    } = this.props;
    return (
      <div className={containerStyles}>
        <div
          className={cx({
            inputLabel: !bigLabel,
            formFieldLabel: bigLabel,
            marginBottom8: bigLabel,
            errorLabel: errors
          })}>
          {label}
          {infoText !== null ? (
            <Fragment>
              {' '}
              <span className={styles.infoText}>{infoText}</span>
            </Fragment>
          ) : null}
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
          disabled={disabled}
          /* className={cx({
            inputField: true,
            formInputError: errors,
            disabled: disabled
          })} */
        />
      </div>
    );
  };
}

export default FileUpload;
