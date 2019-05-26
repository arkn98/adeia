import React, { Component, Fragment } from 'react';
import {
  Description,
  TextBox,
  SelectBox,
  RadioButton,
  TextArea,
  FileUpload,
  FormRow,
  RadioButtonGroup,
  Divider,
  DateBox,
  Form
} from 'screens/App/shared/common/FormInput';
import { withRouter } from 'react-router-dom';
import { ButtonSubmit, ButtonIcon } from 'screens/App/shared/common/Button';
import { ProgressBar } from 'screens/App/shared/common/ProgressBar';
import { ComponentSpinner } from 'screens/App/shared/common/Spinner';
import { AltTable } from 'screens/App/shared/common/Table';
import styles from './LeaveApplication.module.scss';
import { leaveTypesLabels, leaveTypes, holidayTypes } from 'data';
import dayjs from 'dayjs';
import axios from 'axios';
import _ from 'underscore';

class LeaveApplication extends Component {
  state = {
    isSubmitting: false,
    leaveType: '',
    isVacation: false,
    noOfDays: '1',
    from: undefined,
    to: undefined,
    reason: '',
    address: '',
    errors: {},
    slotsToAlternate: [],
    isSlotsToAlternateLoading: false,
    showHalfDayOptions: false,
    halfDayOption: 'FIRST_HALF',
    dayRange: [],
    document: null,
    quotaString: '',
    quotaAvailed: 0,
    quotaAllowed: 0
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        ...this.state,
        errors: nextProps.errors,
        isSubmitting: false
      });
    }
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (
      this.state.from !== undefined &&
      (this.state.leaveType !== prevState.leaveType ||
        this.state.noOfDays !== prevState.noOfDays ||
        this.state.from !== prevState.from ||
        this.state.showHalfDayOptions !== prevState.showHalfDayOptions ||
        this.state.halfDayOption !== prevState.halfDayOption)
    ) {
      this.setState({ ...this.state, isSlotsToAlternateLoading: true });
      this.getSlotsToAlternate();
    }
  };

  getSlotsToAlternate = () => {
    const data = {
      from: this.state.from,
      noOfDays: this.state.noOfDays,
      halfDayOption: this.state.showHalfDayOptions
        ? this.state.halfDayOption
        : ''
    };

    this.props.getTimetableSlotsToAlternate(data).then(res => {
      this.setState({
        ...this.state,
        slotsToAlternate: res.slots,
        isSlotsToAlternateLoading: false,
        to: dayjs(res.to)
          .format('DD-MMM-YYYY')
          .toString(),
        dayRange: res.dayRange
      });
    });
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(this.props.pageTitle);
    this.props.getAllLeaveAllocations();
    this.props.getAllHolidays();
    this.props.getAllStaff();
  };

  noOfDaysOnChangeHandler = event => {
    const regex = /^\d*[.]?\d*$/;
    if (
      !(
        regex.test(event.target.value) &&
        (event.target.value === '' ||
          parseInt(event.target.value) <=
            this.state.quotaAllowed - this.state.quotaAvailed)
      )
    ) {
      return;
    }
    let halfDayOption;
    if (parseFloat(event.target.value) === 0.5) halfDayOption = true;
    else halfDayOption = false;
    this.setState({
      ...this.state,
      noOfDays: event.target.value,
      showHalfDayOptions: halfDayOption
    });
  };

  inputOnChangeHandler = event => {
    let halfDayOption = this.state.showHalfDayOptions;
    let noOfDaysCopy = this.state.noOfDays;
    let fromCopy = this.state.from;
    let toCopy = this.state.to;
    let dayRangeCopy = this.state.dayRange;
    let slotsToAlternateCopy = this.state.slotsToAlternate;
    let documentCopy = this.state.document;
    let quotaAllowedCopy = this.state.quotaAllowed;
    let quotaAvailedCopy = this.state.quotaAvailed;
    let quotaStringCopy = this.state.quotaString;
    let errorsCopy = this.state.errors;
    if (event.target.name === 'leaveType') {
      if (event.target.value !== '') {
        if (event.target.value !== leaveTypes.CPL) {
          quotaAllowedCopy = this.props.profile.profile.leaveAllocation.leaveTypesAllowed.find(
            x => x.leaveType === event.target.value
          ).noOfDays;

          quotaAvailedCopy = this.props.profile.profile.leaveAvailed.find(
            x => x.leaveType === event.target.value
          ).noOfDays;

          quotaStringCopy = `${quotaAllowedCopy -
            quotaAvailedCopy} out of ${quotaAllowedCopy} available`;
        } else {
          quotaAllowedCopy = this.props.profile.profile.cplCredits;
          quotaAvailedCopy = 0;
          quotaStringCopy = `${quotaAllowedCopy} credits available`;
        }
        if (event.target.value === leaveTypes.RH) {
          noOfDaysCopy = 1;
        }
      }
      toCopy = undefined;
      fromCopy = undefined;
      dayRangeCopy = [];
      slotsToAlternateCopy = [];
      documentCopy = null;
      errorsCopy = {};
    }
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      showHalfDayOptions: halfDayOption,
      noOfDays: noOfDaysCopy,
      from: fromCopy,
      to: toCopy,
      dayRange: dayRangeCopy,
      slotsToAlternate: slotsToAlternateCopy,
      document: documentCopy,
      quotaAllowed: quotaAllowedCopy,
      quotaAvailed: quotaAvailedCopy,
      quotaString: quotaStringCopy,
      errors: errorsCopy
    });
  };

  inputRHOnChangeHandler = event => {
    let date = dayjs(event.target.value).toDate();
    if (dayjs().isAfter(date, 'day'))
      alert("Please note: You are selecting a date prior to today's date");
    this.setState({ ...this.state, from: date });
  };

  dateChangeHandler = (name, date) => {
    if (dayjs().isAfter(date, 'day'))
      alert("Please note: You are selecting a date prior to today's date");
    this.setState({
      ...this.state,
      [name]: date
    });
  };

  halfDayOptionChangeHandler = (name, value) => {
    this.setState({ ...this.state, halfDayOption: value });
  };

  alternationOptionRadioHandler = (name, value, index) => {
    let slotsCopy = this.state.slotsToAlternate.slice(0);
    slotsCopy[index][name] = value;
    this.setState({ ...this.state, slotsToAlternate: slotsCopy });
  };

  alternationSelectHandler = (event, index) => {
    event.preventDefault();
    let slotsCopy = this.state.slotsToAlternate.slice(0);
    slotsCopy[index].modification[event.target.name] = event.target.value;
    if (event.target.name === 'alternateSameClass') {
      slotsCopy[index].modification.alternateOthers = '';
    } else {
      slotsCopy[index].modification.alternateSameClass = '';
    }
    this.setState({ ...this.state, slotsToAlternate: slotsCopy });
  };

  postponeDateChangeHandler = (name, value, index) => {
    let slotsCopy = this.state.slotsToAlternate.slice(0);
    slotsCopy[index].modification.postponeDate = value;
    axios
      .post('/api/timetable/get-free-slots', {
        staff:
          slotsCopy[index].alternationOption === 'ALTERNATE'
            ? slotsCopy[index].modification.alternateSameClass !== ''
              ? this.props.staff.staffList.find(
                  x =>
                    x.staffId ===
                    slotsCopy[index].modification.alternateSameClass
                )._id
              : this.props.staff.staffList.find(
                  x =>
                    x.staffId === slotsCopy[index].modification.alternateOthers
                )._id
            : this.props.auth.user.id,
        date: dayjs(slotsCopy[index].modification.postponeDate).toDate(),
        classId: slotsCopy[index].classId,
        classGroupId: slotsCopy[index].classGroupId,
        halfDayOption: dayjs(slotsCopy[index].modification.postponeDate).isSame(
          dayjs(this.state.from),
          'day'
        )
          ? this.state.showHalfDayOptions
            ? this.state.halfDayOption
            : ''
          : ''
      })
      .then(res => {
        if (res.data) {
          slotsCopy[index].modification.availableSlots = res.data;
        } else {
          slotsCopy[index].modification.availableSlots = [];
        }
        this.setState({ ...this.state, slotsToAlternate: slotsCopy });
      });
  };

  postponeHourChangeHandler = (event, index) => {
    let slotsCopy = this.state.slotsToAlternate.slice(0);
    slotsCopy[index].modification.postponeHour = event.target.value;
    this.setState({ ...this.state, slotsToAlternate: slotsCopy });
  };

  radioClickHandler = event => {
    this.setState({
      ...this.state,
      [event.target.getAttribute('name')]: !this.state[
        event.target.getAttribute('name')
      ]
    });
  };

  fileOnChangeHandler = event => {
    this.setState({
      ...this.state,
      document: event.target.files[0]
    });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });
    const data = {
      staff: this.props.auth.user.id,
      applierEmail: this.props.auth.user.email,
      staffId: this.props.auth.user.staffId,
      leaveType: this.state.leaveType,
      isVacation: this.state.isVacation,
      noOfDays: this.state.noOfDays,
      dayRange: this.state.dayRange,
      reason: this.state.reason,
      address: this.state.address,
      slotsToAlternate: this.state.slotsToAlternate,
      halfDayOption: this.state.showHalfDayOptions
        ? this.state.halfDayOption
        : '',
      document: this.state.document
    };

    this.props
      .addLeave(data)
      .then(res => {
        this.setState({ ...this.state, isSubmitting: false }, () => {
          this.props.showPopout({
            type: 'modalSingleButton',
            title: 'Leave Application successful',
            message:
              'Your leave application has been successfully submitted. Leave ID: <span style="font-weight: 600;">' +
              res.leaveId +
              '</span>',
            buttonPrimary: true,
            buttonContent: 'Okay'
          });
          this.props.history.push('/dashboard');
        });
      })
      .catch(err => console.log(err));
  };

  render = () => {
    const { auth, profile } = this.props;
    const { quotaString, quotaAllowed, quotaAvailed, errors } = this.state;

    let slots = [];
    let lastDate = '';
    this.state.slotsToAlternate.forEach((item, index) => {
      let formattedDate = dayjs(item.date).format('DD-MM-YYYY ddd');
      if (lastDate !== formattedDate) {
        lastDate = formattedDate;
      } else {
        formattedDate = '';
      }

      let alreadySelectedSlots = [];
      this.state.slotsToAlternate
        .filter(x => x.alternationOption === 'POSTPONE')
        .filter((x, xindex) => xindex !== index)
        .filter(x =>
          dayjs(x.modification.postponeDate).isSame(
            dayjs(item.modification.postponeDate),
            'day'
          )
        )
        .filter(x => x.modification.postponeHour !== '')
        .forEach(tempItem => {
          alreadySelectedSlots.push(
            parseInt(tempItem.modification.postponeHour)
          );
        });
      let canSelectSlots = _.difference(
        item.modification.availableSlots,
        alreadySelectedSlots
      );

      slots.push([
        {
          value: formattedDate,
          style: {}
        },
        {
          value: item.classCode,
          style: {}
        },
        {
          value: item.hour,
          style: {}
        },
        {
          value: (
            <RadioButtonGroup
              index={index}
              name="alternationOption"
              errors={
                errors.slotsToAlternate &&
                errors.slotsToAlternate[index] &&
                errors.slotsToAlternate[index].alternationOption
              }
              radioClickHandler={this.alternationOptionRadioHandler}
              optlist={[
                {
                  isChecked: item.alternationOption === 'ALTERNATE',
                  value: 'ALTERNATE',
                  label: 'Alternate'
                },
                {
                  isChecked: item.alternationOption === 'POSTPONE',
                  value: 'POSTPONE',
                  label: 'Postpone'
                }
              ]}
            />
          ),
          style: {}
        },
        {
          value: (
            <Fragment>
              {item.alternationOption !== 'POSTPONE' ? (
                <Fragment>
                  <SelectBox
                    name="alternateSameClass"
                    errors={
                      errors.slotsToAlternate &&
                      errors.slotsToAlternate[index] &&
                      errors.slotsToAlternate[index].modification &&
                      errors.slotsToAlternate[index].modification
                        .alternateSameClass
                    }
                    containerStyles={
                      item.alternationOption !== 'POSTPONE'
                        ? styles.marginBottom8
                        : null
                    }
                    label={
                      item.alternationOption !== 'POSTPONE'
                        ? 'From Same Class'
                        : null
                    }
                    makePlaceholderOptionDisabled={false}
                    index={index}
                    value={item.modification.alternateSameClass}
                    disabled={item.alternationOption === 'POSTPONE'}
                    inputOnChangeHandler={this.alternationSelectHandler}
                    optList={item.modification.staffsAvailable.map(item => {
                      let staff = this.props.staff.staffList.find(
                        x => x._id === item
                      );
                      return {
                        label: `${staff.staffId} - ${staff.name}`,
                        value: staff.staffId
                      };
                    })}
                  />
                  <SelectBox
                    containerStyles={styles.marginBottom2}
                    name="alternateOthers"
                    errors={
                      errors.slotsToAlternate &&
                      errors.slotsToAlternate[index] &&
                      errors.slotsToAlternate[index].modification &&
                      errors.slotsToAlternate[index].modification
                        .alternateOthers
                    }
                    label="Others"
                    makePlaceholderOptionDisabled={false}
                    index={index}
                    value={item.modification.alternateOthers}
                    disabled={item.alternationOption === 'POSTPONE'}
                    inputOnChangeHandler={this.alternationSelectHandler}
                    optList={item.modification.allStaffsAvailable.map(item => {
                      let staff = this.props.staff.staffList.find(
                        x => x._id === item
                      );
                      return {
                        label: `${staff.staffId} - ${staff.name}`,
                        value: staff.staffId
                      };
                    })}
                  />
                </Fragment>
              ) : (
                <TextBox
                  name="name"
                  type="text"
                  disabled={true}
                  value={`${this.props.auth.user.staffId} - ${
                    this.props.auth.user.name
                  }`}
                />
              )}
            </Fragment>
          ),
          style: {}
        },
        {
          value:
            item.alternationOption === 'POSTPONE' ? (
              <Fragment>
                <DateBox
                  name="postponeDate"
                  errors={
                    errors.slotsToAlternate &&
                    errors.slotsToAlternate[index] &&
                    errors.slotsToAlternate[index].modification &&
                    errors.slotsToAlternate[index].modification.postponeDate
                  }
                  label="Date"
                  index={index}
                  value={item.modification.postponeDate}
                  inputOnChangeHandler={this.postponeDateChangeHandler}
                  disabledDays={_.union(
                    this.props.holidays.holidayList
                      .filter(
                        x => x.holidayType === holidayTypes.PUBLIC_HOLIDAY
                      )
                      .map(x => dayjs(x.date).toDate()),
                    !this.state.showHalfDayOptions
                      ? this.state.dayRange.map(item => dayjs(item).toDate())
                      : []
                  )}
                  containerStyles={styles.marginBottom8}
                />
                <SelectBox
                  name="postponeHour"
                  label="Hour"
                  makePlaceholderOptionDisabled={false}
                  index={index}
                  value={item.modification.postponeHour}
                  inputOnChangeHandler={this.postponeHourChangeHandler}
                  errors={
                    errors.slotsToAlternate &&
                    errors.slotsToAlternate[index] &&
                    errors.slotsToAlternate[index].modification &&
                    errors.slotsToAlternate[index].modification.postponeHour
                  }
                  optList={canSelectSlots.map(item => {
                    return {
                      label: item,
                      value: item
                    };
                  })}
                />
              </Fragment>
            ) : (
              '- N/A -'
            ),
          style: {}
        }
      ]);
    });

    return (
      <Fragment>
        <Form
          onSubmit={this.formSubmitHandler}
          showBottomSpace={true}
          fullWidth={true}>
          <TextBox
            name="staffId"
            label="Staff ID"
            type="text"
            disabled={true}
            value={auth.user.staffId}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.staffId}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="name"
            label="Name"
            type="text"
            disabled={true}
            value={auth.user.name}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.name}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="designation"
            label="Designation"
            type="text"
            disabled={true}
            value={auth.user.designation}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.designation}
            containerStyles={styles.marginBottom20}
          />
          <SelectBox
            name="leaveType"
            label="Leave Type"
            value={this.state.leaveType}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.leaveType}
            containerStyles={styles.marginBottom20}
            optList={
              profile.profile.leaveAllocation
                ? profile.profile.leaveAllocation.leaveTypesAllowed.map(
                    item => {
                      return {
                        value: item.leaveType,
                        label: `${item.leaveType} - ${
                          leaveTypesLabels[item.leaveType]
                        }`
                      };
                    }
                  )
                : []
            }
          />
          {this.state.leaveType !== '' ? (
            <Fragment>
              <ProgressBar
                label={`Available Leave Quota - ${
                  leaveTypesLabels[this.state.leaveType]
                } - ${quotaString}`}
                barWidth={quotaAllowed - quotaAvailed}
                trackWidth={quotaAllowed}
                containerStyles={styles.marginBottom20}
              />
              {quotaAllowed - quotaAvailed > 0 ? (
                <Fragment>
                  <FormRow>
                    <TextBox
                      name="noOfDays"
                      label="No. Of Days"
                      type="text"
                      description="For half day leaves, enter 0.5 here"
                      value={this.state.noOfDays}
                      disabled={this.state.leaveType === leaveTypes.RH}
                      inputOnChangeHandler={this.noOfDaysOnChangeHandler}
                      errors={errors.noOfDays}
                      containerStyles={styles.marginBottom20}
                    />
                    {this.state.leaveType === leaveTypes.RH ? (
                      <Fragment>
                        <SelectBox
                          name="from"
                          label="Date"
                          description="Select from the restricted holidays listed here"
                          value={this.state.from}
                          inputOnChangeHandler={this.inputRHOnChangeHandler}
                          errors={errors.from}
                          optList={this.props.holidays.holidayList
                            .filter(
                              x =>
                                x.holidayType ===
                                holidayTypes.RESTRICTED_HOLIDAY
                            )
                            .map(item => {
                              return {
                                value: dayjs(item.date).toDate(),
                                label: `${dayjs(item.date)
                                  .format('DD-MM-YYYY - dddd')
                                  .toString()} - ${item.description}`
                              };
                            })}
                        />
                      </Fragment>
                    ) : (
                      <Fragment>
                        <DateBox
                          name="from"
                          label="From"
                          description="All public holidays & leaves are excluded automatically"
                          value={this.state.from}
                          inputOnChangeHandler={this.dateChangeHandler}
                          errors={errors.from}
                          disabledDays={this.props.holidays.holidayList
                            .filter(
                              x => x.holidayType === holidayTypes.PUBLIC_HOLIDAY
                            )
                            .map(x => dayjs(x.date).toDate())}
                          containerStyles={styles.marginBottom20}
                        />
                        <TextBox
                          name="to"
                          label="To"
                          description="All public holidays & leaves are excluded automatically"
                          disabled={true}
                          type="text"
                          value={
                            this.state.to !== undefined
                              ? this.state.to
                              : 'Select a date'
                          }
                          errors={errors.to}
                          containerStyles={styles.marginBottom20}
                        />
                      </Fragment>
                    )}
                  </FormRow>
                  {this.state.showHalfDayOptions ? (
                    <Fragment>
                      <FormRow>
                        <RadioButtonGroup
                          name="halfDayOption"
                          label="Half Day Option"
                          errors={errors.halfDayOption}
                          radioClickHandler={this.halfDayOptionChangeHandler}
                          optlist={[
                            {
                              isChecked:
                                this.state.halfDayOption === 'FIRST_HALF',
                              value: 'FIRST_HALF',
                              label: 'Forenoon'
                            },
                            {
                              isChecked:
                                this.state.halfDayOption === 'SECOND_HALF',
                              value: 'SECOND_HALF',
                              label: 'Afternoon'
                            }
                          ]}
                        />
                      </FormRow>
                      <Divider
                        isDefault={false}
                        style={{ marginTop: '12px', marginBottom: '20px' }}
                      />
                    </Fragment>
                  ) : null}
                  {this.state.isSlotsToAlternateLoading ? (
                    <div
                      className={styles.marginBottom20}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '32px'
                      }}>
                      <ComponentSpinner loadingPrimary={true} />
                    </div>
                  ) : this.state.from !== undefined ? (
                    slots.length === 0 ? (
                      <Description containerStyles={styles.marginBottom20}>
                        No slots to alternate or postpone.
                      </Description>
                    ) : (
                      <AltTable
                        thead={[
                          {
                            value: 'Date',
                            style: {
                              flex: '108 0 auto',
                              maxWidth: '108px',
                              width: '108px'
                            }
                          },
                          {
                            value: 'Class',
                            style: {
                              flex: '48 0 auto',
                              maxWidth: '48px',
                              width: '48px'
                            }
                          },
                          {
                            value: 'Hour',
                            style: {
                              flex: '36 0 auto',
                              maxWidth: '36px',
                              width: '36px'
                            }
                          },
                          {
                            value: 'Option',
                            style: {
                              flex: '150 0 auto',
                              maxWidth: '150px',
                              width: '150px'
                            }
                          },
                          {
                            value: 'Alternatives',
                            style: {
                              flex: '250 0 auto',
                              maxWidth: '250px',
                              width: '250px'
                            }
                          },
                          {
                            value: 'Postponed to',
                            style: { flex: '100 0 auto', width: '100px' }
                          }
                        ]}
                        containerStyles={styles.marginBottom20}
                        adaptForFullWidth={true}
                        striped={true}
                        tbody={slots}
                      />
                    )
                  ) : null}
                  <RadioButton
                    name="isVacation"
                    content="Is it a vacation?"
                    value={this.state.isVacation}
                    onClick={this.radioClickHandler}
                    errors={errors.isVacation}
                    containerStyles={styles.marginBottom20}
                  />
                  {this.state.leaveType === leaveTypes.SCL ||
                  this.state.leaveType === leaveTypes.OD ? (
                    <FileUpload
                      name="document"
                      label="Document"
                      errors={errors.document}
                      containerStyles={styles.marginBottom20}
                      inputOnChangeHandler={this.fileOnChangeHandler}
                    />
                  ) : null}
                  <TextBox
                    name="reason"
                    label="Reason"
                    type="text"
                    value={this.state.reason}
                    inputOnChangeHandler={this.inputOnChangeHandler}
                    errors={errors.reason}
                    containerStyles={styles.marginBottom20}
                  />
                  <TextArea
                    name="address"
                    label="Address for communication"
                    description="(if permission is required to go out-of-station)"
                    type="text"
                    value={this.state.address}
                    inputOnChangeHandler={this.inputOnChangeHandler}
                    errors={errors.address}
                    containerStyles={styles.marginBottom20}
                  />
                  {typeof this.state.from !== 'undefined' ? (
                    <ButtonSubmit
                      sizeSmall={true}
                      className={styles.marginBottom20}
                      isLoading={this.state.isSubmitting}>
                      Submit Application
                    </ButtonSubmit>
                  ) : null}
                </Fragment>
              ) : (
                <Fragment>
                  <Description>
                    It seems like your leave quota is over under this category.
                    Please contact the HOD/Office for further processing.
                  </Description>
                </Fragment>
              )}
            </Fragment>
          ) : null}
        </Form>
      </Fragment>
    );
  };
}

export default withRouter(LeaveApplication);
