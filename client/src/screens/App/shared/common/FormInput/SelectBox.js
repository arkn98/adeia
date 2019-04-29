import React, { Component, Fragment } from 'react';
import styles from './FormInput.module.scss';
import { Description } from '.';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...styles });

class SelectBox extends Component {
  setFocus = () => {
    this.selectBox.focus();
  };

  render = () => {
    const {
      errors,
      containerStyles = {},
      descriptionStyles = {},
      description = '',
      infoText = null,
      label = null,
      name,
      index = undefined,
      inputOnChangeHandler,
      value,
      bigLabel = false,
      disabled = false,
      optList = [],
      makePlaceholderOptionDisabled = true
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
        <select
          name={name}
          ref={input => {
            this.selectBox = input;
          }}
          onChange={event => inputOnChangeHandler(event, index)}
          disabled={disabled}
          className={cx({
            inputField: true,
            formSelect: true,
            formInputError: errors,
            disabled: disabled
          })}>
          <option disabled={makePlaceholderOptionDisabled} selected value="">
            Select an option
          </option>
          {optList.map((item, index) => {
            return (
              <option
                key={index}
                selected={value === item.value}
                value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
}

export default SelectBox;
