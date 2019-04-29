import React, { Component, Fragment } from 'react';
import styles from './FormInput.module.scss';
import classNames from 'classnames/bind';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Description } from '.';

dayjs.extend(customParseFormat);

const cx = classNames.bind({ ...styles });

const DatePickerOverlay = ({ children, ...props }) => {
  return (
    <div {...props} className={styles.datePickerOverlay}>
      {children}
    </div>
  );
};

class DateBox extends Component {
  FORMAT = 'DD-MMM-YYYY';

  formatDate = (date, format, locale) => {
    return dayjs(date)
      .format(this.FORMAT)
      .toString();
  };

  parseDate = (str, format, locale) => {
    const parsed = dayjs(str, format);
    if (dayjs(parsed).isValid()) return parsed;
    else return undefined;
  };

  render = () => {
    const {
      errors,
      containerStyles = {},
      descriptionStyles = {},
      description = '',
      infoText = null,
      label = null,
      index = undefined,
      name,
      inputOnChangeHandler,
      value,
      bigLabel = false,
      disabled = false,
      fromMonth = null,
      toMonth = null,
      maxDate = null,
      minDate = null,
      placeholder = 'Select a date',
      disabledDays = []
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
        <DayPickerInput
          name={name}
          onDayChange={date => inputOnChangeHandler(name, date, index)}
          format={this.FORMAT}
          formatDate={this.formatDate}
          parseDate={this.parseDate}
          value={value}
          overlayComponent={DatePickerOverlay}
          dayPickerProps={{
            className: cx({ noTextColorChange: true }),
            showOutsideDays: true,
            selectedDays: value,
            disabledDays: [
              ...disabledDays,
              { daysOfWeek: [0] /* before: minDate, after: maxDate */ }
            ],
            modifiersStyles: {
              selected: {
                backgroundColor: '#7289da'
              }
            },
            fromMonth,
            toMonth
          }}
          placeholder={placeholder}
          style={{ width: '100%' }}
          inputProps={{
            readOnly: true,
            className: cx({
              inputField: true,
              formInputError: errors,
              disabled: disabled,
              relativePosition: true
            })
          }}
        />
      </div>
    );
  };
}

export default DateBox;
