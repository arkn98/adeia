import React, { Component, Fragment } from 'react';
import styles from './FormInput.module.scss';
import classNames from 'classnames/bind';
import { RadioButton, Description } from '.';

const cx = classNames.bind({ ...styles });

class RadioButtonGroup extends Component {
  radioClickHandler = event => {
    const element = event.target;
    const data = element.getAttribute('data');
    this.props.radioClickHandler(this.props.name, data);
  };

  render = () => {
    const {
      errors,
      optlist = [],
      description = '',
      descriptionStyles = {},
      containerStyles = {},
      infoText = null,
      label,
      name,
      bigLabel = false,
      disabled = false
    } = this.props;

    const noIsCheckSet = optlist.every(currentvalue => {
      return !currentvalue.isChecked;
    });

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
        {description !== '' ? (
          <Description containerStyles={descriptionStyles}>
            {description}
          </Description>
        ) : null}
        <div>
          {optlist.map((option, index) => {
            return (
              <RadioButton
                name={name}
                data={option.value}
                content={option.label}
                value={noIsCheckSet ? index === 0 : option.isChecked}
                onClick={this.radioClickHandler}
                errors={errors}
              />
            );
          })}
        </div>
      </div>
    );
  };
}

export default RadioButtonGroup;
