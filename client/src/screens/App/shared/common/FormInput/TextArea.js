import React, { Component, Fragment } from 'react';
import styles from './FormInput.module.scss';
import { Description } from '.';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...styles });

class TextArea extends Component {
  setFocus = () => {
    this.textArea.focus();
  };

  render = () => {
    const {
      errors,
      containerStyles = {},
      infoText = null,
      label = null,
      name,
      inputOnChangeHandler,
      value,
      description = '',
      descriptionStyles = {},
      bigLabel = false,
      disabled = false
    } = this.props;
    return (
      <div className={containerStyles}>
        {label !== null ? (
          <div
            className={cx({
              inputLabel: !bigLabel,
              formFieldLabel: bigLabel,
              marginBottom8: bigLabel || description === '',
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
        ) : null}
        {description !== '' ? (
          <Description containerStyles={descriptionStyles}>
            {description}
          </Description>
        ) : null}
        <textarea
          name={name}
          ref={input => {
            this.textArea = input;
          }}
          onChange={inputOnChangeHandler}
          value={value}
          disabled={disabled}
          className={cx({
            inputField: true,
            formTextArea: true,
            formInputError: errors,
            disabled: disabled
          })}
        />
      </div>
    );
  };
}

export default TextArea;
