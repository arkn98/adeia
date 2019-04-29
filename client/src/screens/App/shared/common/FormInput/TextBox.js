import React, { Component, Fragment } from 'react';
import { Description } from '.';
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
      descriptionStyles = {},
      infoText = null,
      type = 'text',
      label = null,
      name,
      inputOnChangeHandler,
      indexedInputChangeHandler = null,
      index = undefined,
      description = '',
      value,
      bigLabel = false,
      disabled = false,
      ...rest
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
        <input
          name={name}
          ref={input => {
            this.textBox = input;
          }}
          onChange={
            indexedInputChangeHandler === null
              ? inputOnChangeHandler
              : event =>
                  indexedInputChangeHandler(
                    event.target.name,
                    event.target.value,
                    index
                  )
          }
          value={value}
          type={type}
          disabled={disabled}
          className={cx({
            inputField: true,
            formInputError: errors,
            disabled: disabled
          })}
          {...rest}
        />
      </div>
    );
  };
}

export default TextBox;
