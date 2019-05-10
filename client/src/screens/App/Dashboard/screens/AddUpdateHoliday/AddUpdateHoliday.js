import React, { Fragment, Component } from 'react';
import {
  Form,
  TextBox,
  DateBox,
  SectionLabel,
  Divider,
  RadioButtonGroup
} from 'screens/App/shared/common/FormInput';
import { AltTable } from 'screens/App/shared/common/Table';
import { ButtonIcon, ButtonSubmit } from 'screens/App/shared/common/Button';
import styles from './AddUpdateHoliday.module.scss';
import { holidayTypes, holidayTypeSelectOptions } from 'data';
import dayjs from 'dayjs';

class AddUpdateHoliday extends Component {
  state = {
    isSubmitting: false,
    isUpdateSubmittingPublic: false,
    isUpdateSubmittingRestricted: false,
    errors: {},
    date: '',
    description: '',
    holidayType: holidayTypes.PUBLIC_HOLIDAY,
    publicHolidays: [],
    restrictedHolidays: []
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        ...this.state,
        errors: nextProps.errors,
        isSubmitting: false,
        isUpdateSubmittingPublic: false,
        isUpdateSubmittingRestricted: false
      });
    }
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(this.props.pageTitle);
    this.props.getAllHolidays().then(() => {
      this.setState({
        ...this.state,
        publicHolidays: this.props.holidays.holidayList
          .filter(x => x.holidayType === holidayTypes.PUBLIC_HOLIDAY)
          .map(item => ({ ...item })),
        restrictedHolidays: this.props.holidays.holidayList
          .filter(x => x.holidayType === holidayTypes.RESTRICTED_HOLIDAY)
          .map(item => ({ ...item }))
      });
    });
  };

  inputOnChangeHandler = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  radioClickHandler = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  dateChangeHandler = (name, date) => {
    this.setState({
      ...this.state,
      [name]: date
    });
  };

  updateRestrictedHolidayHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isUpdateSubmittingRestricted: true });

    const data = {
      holidayType: holidayTypes.RESTRICTED_HOLIDAY,
      holidayList: this.state.restrictedHolidays
    };

    this.props.updateHolidays(data).then(res => {
      this.props.getAllHolidays().then(response => {
        this.setState(
          {
            ...this.state,
            isUpdateSubmittingRestricted: false,
            errors: {},
            restrictedHolidays: this.props.holidays.holidayList
              .filter(x => x.holidayType === holidayTypes.RESTRICTED_HOLIDAY)
              .map(item => ({ ...item }))
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Restricted holidays successfully updated.',
              buttonPrimary: true,
              buttonContent: 'Okay'
            });
          }
        );
      });
    });
  };

  updatePublicHolidayHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isUpdateSubmittingPublic: true });

    const data = {
      holidayType: holidayTypes.PUBLIC_HOLIDAY,
      holidayList: this.state.publicHolidays
    };

    this.props.updateHolidays(data).then(res => {
      this.props.getAllHolidays().then(response => {
        this.setState(
          {
            ...this.state,
            isUpdateSubmittingPublic: false,
            errors: {},
            publicHolidays: this.props.holidays.holidayList
              .filter(x => x.holidayType === holidayTypes.PUBLIC_HOLIDAY)
              .map(item => ({ ...item }))
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Public holidays successfully updated.',
              buttonPrimary: true,
              buttonContent: 'Okay'
            });
          }
        );
      });
    });
  };

  publicHolidaysInputChangeHandler = (name, value, index) => {
    let copy = this.state.publicHolidays.slice(0);
    copy[index][name] = value;
    this.setState({
      ...this.state,
      publicHolidays: copy
    });
  };

  restrictedHolidaysInputChangeHandler = (name, value, index) => {
    let copy = this.state.restrictedHolidays.slice(0);
    copy[index][name] = value;
    this.setState({
      ...this.state,
      restrictedHolidays: copy
    });
  };

  publicHolidayDeleteHandler = index => {
    let stateCopy = this.state.publicHolidays.slice(0);
    stateCopy.splice(index, 1);
    this.setState({ ...this.state, publicHolidays: stateCopy });
  };

  restrictedHolidayDeleteHandler = index => {
    let stateCopy = this.state.restrictedHolidays.slice(0);
    stateCopy.splice(index, 1);
    this.setState({ ...this.state, restrictedHolidays: stateCopy });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });

    const data = {
      date: this.state.date,
      description: this.state.description,
      holidayType: this.state.holidayType
    };

    this.props.addHoliday(data).then(res => {
      this.props.getAllHolidays().then(response => {
        this.setState(
          {
            ...this.state,
            isSubmitting: false,
            errors: {},
            date: '',
            description: '',
            publicHolidays:
              this.state.holidayType === holidayTypes.PUBLIC_HOLIDAY
                ? this.props.holidays.holidayList
                    .filter(x => x.holidayType === holidayTypes.PUBLIC_HOLIDAY)
                    .map(item => ({ ...item }))
                : this.state.publicHolidays,
            restrictedHolidays:
              this.state.holidayType === holidayTypes.RESTRICTED_HOLIDAY
                ? this.props.holidays.holidayList
                    .filter(
                      x => x.holidayType === holidayTypes.RESTRICTED_HOLIDAY
                    )
                    .map(item => ({ ...item }))
                : this.state.restrictedHolidays
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Holiday successfully added.',
              buttonPrimary: true,
              buttonContent: 'Okay'
            });
          }
        );
      });
    });
  };

  render = () => {
    const { errors } = this.state;

    return (
      <Fragment>
        <Form onSubmit={this.formSubmitHandler}>
          <SectionLabel
            containerStyles={styles.marginBottom20}
            label="Add Holiday"
          />
          <DateBox
            name="date"
            label="Date"
            value={this.state.date}
            inputOnChangeHandler={this.dateChangeHandler}
            errors={errors.date}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="description"
            label="Description"
            type="text"
            value={this.state.description}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.description}
            containerStyles={styles.marginBottom20}
          />
          <RadioButtonGroup
            name="holidayType"
            label="Holiday Type"
            containerStyles={styles.marginBottom20}
            radioClickHandler={this.radioClickHandler}
            optlist={holidayTypeSelectOptions.map((item, index) => {
              return {
                isChecked: this.state.holidayType === item.value,
                value: item.value,
                label: item.label
              };
            })}
          />
          <ButtonSubmit
            sizeSmall={true}
            className={styles.marginBottom20}
            isLoading={this.state.isSubmitting}>
            Add Holiday
          </ButtonSubmit>
          <Divider />
        </Form>
        <Form onSubmit={this.updatePublicHolidayHandler}>
          <SectionLabel
            containerStyles={styles.marginBottom8}
            label="Alter Public holidays"
          />
          <AltTable
            thead={[
              { value: 'Date', style: { width: '150px' } },
              { value: 'Description', style: { width: '300px' } },
              {
                value: '',
                style: { textAlign: 'right' }
              }
            ]}
            containerStyles={styles.marginBottom20}
            tbody={this.state.publicHolidays.map((item, index) => {
              return [
                {
                  value: dayjs(item.date).format(item.format),
                  style: { width: '150px' }
                },
                {
                  value: (
                    <TextBox
                      name="description"
                      type="text"
                      index={index}
                      value={item.description}
                      indexedInputChangeHandler={
                        this.publicHolidaysInputChangeHandler
                      }
                    />
                  ),
                  style: { width: '300px', boxSizing: 'border-box' }
                },
                {
                  value: (
                    <ButtonIcon
                      isLoading={this.state.isUpdateSubmittingPublic}
                      index={index}
                      type="delete"
                      onClick={this.publicHolidayDeleteHandler}
                    />
                  ),
                  style: { textAlign: 'right' }
                }
              ];
            })}
          />
          <ButtonSubmit
            sizeSmall={true}
            className={styles.marginBottom20}
            isLoading={this.state.isUpdateSubmittingPublic}>
            Save Changes
          </ButtonSubmit>
          <Divider />
        </Form>
        <Form
          onSubmit={this.updateRestrictedHolidayHandler}
          showBottomSpace={true}>
          <SectionLabel
            containerStyles={styles.marginBottom8}
            label="Alter Restricted holidays"
          />
          <AltTable
            thead={[
              { value: 'Date', style: { width: '150px' } },
              { value: 'Description', style: { width: '300px' } },
              {
                value: '',
                style: { textAlign: 'right' }
              }
            ]}
            containerStyles={styles.marginBottom20}
            tbody={this.state.restrictedHolidays.map((item, index) => {
              return [
                {
                  value: dayjs(item.date).format(item.format),
                  style: { width: '150px' }
                },
                {
                  value: (
                    <TextBox
                      name="description"
                      type="text"
                      index={index}
                      value={item.description}
                      indexedInputChangeHandler={
                        this.restrictedHolidaysInputChangeHandler
                      }
                    />
                  ),
                  style: { width: '300px', boxSizing: 'border-box' }
                },
                {
                  value: (
                    <ButtonIcon
                      isLoading={this.state.isUpdateSubmittingRestricted}
                      index={index}
                      onClick={this.restrictedHolidayDeleteHandler}
                    />
                  ),
                  style: { textAlign: 'right' }
                }
              ];
            })}
          />
          <ButtonSubmit
            sizeSmall={true}
            className={styles.marginBottom20}
            isLoading={this.state.isUpdateSubmittingRestricted}>
            Save Changes
          </ButtonSubmit>
        </Form>
      </Fragment>
    );
  };
}

export default AddUpdateHoliday;
