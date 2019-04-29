import React, { Component, Fragment } from 'react';
import styles from './FormInput.module.scss';
import classNames from 'classnames/bind';
import Select, { createFilter } from 'react-select';
import { Description } from '.';

const cx = classNames.bind({ ...styles });

class SelectSearch extends Component {
  setFocus = () => {
    this.selectBox.focus();
  };

  componentDidMount = () => {};

  filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: 'any'
  };

  render = () => {
    const {
      errors,
      containerStyles = {},
      descriptionStyles = {},
      description = '',
      infoText = null,
      isLoading = false,
      isSearchable = true,
      label = null,
      name,
      inputOnChangeHandler,
      value,
      index = undefined,
      bigLabel = false,
      disabled = false,
      optList = [],
      isMultiSelect = false,
      isDarkTheme,
      propStyles = null
    } = this.props;

    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        minWidth: '100px'
      }),
      menuList: (provided, state) => ({
        ...provided,
        paddingBottom: 0,
        paddingTop: 0
      }),
      multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: isDarkTheme
          ? 'hsla(0, 0%, 100%, 0.1)'
          : provided.backgroundColor
      }),
      multiValueRemove: provided => ({
        ...provided,
        color: !isDarkTheme ? '#4f545c' : provided.color
      }),
      multiValueLabel: provided => ({
        ...provided,
        color: isDarkTheme ? '#fff' : '#4f545c'
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused
          ? 'rgba(79, 84, 92, 0.1)'
          : 'transparent',
        cursor: 'default',
        display: 'block',
        fontSize: 'inherit',
        textAlign: 'left',
        padding: '6px',
        boxSizing: 'border-box',
        overflowX: 'none',
        userSelect: 'none',
        color: '#4f545c'
      }),
      control: (provided, state) => ({
        alignItems: 'left',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        outline: '0 !important',
        position: 'relative',
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
        backgroundColor: isDarkTheme ? 'rgba(0, 0, 0, 0.1)' : '#fff',
        color: '#fff',
        fontSize: '16px',
        lineHeight: '18px',
        borderColor: state.isFocused ? '#7289da' : 'rgba(0, 0, 0, 0.3)',
        '&:hover': {
          borderColor: state.isFocused ? '#7289da' : '#040405'
        },
        minHeight: '40px',
        borderRadius: '3px',
        borderStyle: 'solid',
        borderWidth: '1px',
        boxSizing: 'border-box',
        transition: 'background-color 0.15s ease, border 0.15s ease'
      }),
      singleValue: (provided, state) => ({
        marginLeft: 0,
        position: 'absolute',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: isDarkTheme ? 'hsla(0, 0%, 100%, 0.8)' : '#4f545c'
      }),
      input: (provided, state) => ({
        color: isDarkTheme ? '#fff' : '#4f545c'
      }),
      clearIndicator: () => ({
        display: 'none'
      }),
      indicatorSeparator: () => ({
        display: 'none'
      }),
      dropdownIndicator: (provided, state) => ({
        display: 'flex',
        padding: '6px',
        color: isDarkTheme ? '#fff' : '#4f545c',
        opacity: '0.6'
      }),
      valueContainer: (provided, state) => ({
        ...provided,
        padding: '8px',
        width: '50px'
      })
    };

    return (
      <div className={containerStyles} style={propStyles}>
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
        <Select
          name={name}
          options={optList}
          disabled={disabled}
          isLoading={isLoading}
          isSearchable={isSearchable}
          isMulti={isMultiSelect}
          value={value}
          onChange={val => inputOnChangeHandler(val, index, name)}
          placeholder="Select an option"
          styles={customStyles}
          className={styles.multiSelectContainer}
          filterOption={createFilter(this.filterConfig)}
        />
      </div>
    );
  };
}

export default SelectSearch;
