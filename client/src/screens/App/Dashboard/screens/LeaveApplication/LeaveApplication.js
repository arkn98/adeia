import React, { Component, Fragment } from 'react';
import {
  TextBox,
  SelectBox,
  RadioButton,
  TextArea,
  FormRow,
  DateBox
} from 'screens/App/shared/common/FormInput';
import { withRouter } from 'react-router-dom';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import styles from './LeaveApplication.module.scss';
import leaveTypes from 'data/leaveTypes';
import dayjs from 'dayjs';

class LeaveApplication extends Component {
  state = {
    isSubmitting: false,
    leaveType: '',
    isVacation: false,
    noOfDays: '1',
    from: new Date(),
    to: new Date(),
    reason: '',
    address: '',
    errors: {}
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

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(this.props.pageTitle);
  };

  inputOnChangeHandler = event => {
    if (event.target.name === 'noOfDays') {
      const regex = /^-?\d*[.]?\d*$/;
      if (
        !(
          regex.test(event.target.value) &&
          (event.target.value === '' || parseInt(event.target.value) <= 100)
        )
      )
        return;
    }
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  dateChangeHandler = (name, date) => {
    if (dayjs().isAfter(date, 'day'))
      alert("Please note: You are selecting a date prior to today's date");
    this.setState({
      ...this.state,
      [name]: date
    });
  };

  radioClickHandler = event => {
    this.setState({
      ...this.state,
      [event.target.getAttribute('name')]: !this.state[
        event.target.getAttribute('name')
      ]
    });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });
    const data = {
      staffId: this.props.auth.user.staffId,
      leaveType: this.state.leaveType,
      noOfDays: this.state.noOfDays,
      from: this.state.from,
      to:
        this.state.noOfDays !== ''
          ? parseInt(this.state.noOfDays) < 1
            ? dayjs(this.state.from).add(0, 'day')
            : dayjs(this.state.from)
                .add(parseInt(this.state.noOfDays), 'day')
                .subtract(1, 'day')
          : '',
      isVacation: this.state.isVacation,
      reason: this.state.reason,
      address: this.state.address
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
              res.data.leaveId +
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
    const { auth } = this.props;
    const { errors } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.formSubmitHandler}>
          <TextBox
            name="staffId"
            label="Staff ID"
            bigLabel={true}
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
            bigLabel={true}
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
            bigLabel={true}
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
            bigLabel={true}
            value={this.state.leaveType}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.leaveType}
            containerStyles={styles.marginBottom20}
            optList={leaveTypes.leaveTypes}
          />
          {this.state.leaveType !== '' ? (
            <Fragment>
              <FormRow>
                <TextBox
                  name="noOfDays"
                  label="No. Of Days"
                  bigLabel={true}
                  type="text"
                  value={this.state.noOfDays}
                  inputOnChangeHandler={this.inputOnChangeHandler}
                  errors={errors.noOfDays}
                  containerStyles={styles.marginBottom20}
                />
                <DateBox
                  name="from"
                  label="From"
                  bigLabel={true}
                  value={this.state.from}
                  inputOnChangeHandler={this.dateChangeHandler}
                  errors={errors.from}
                  containerStyles={styles.marginBottom20}
                />
                <TextBox
                  name="to"
                  label="To"
                  bigLabel={true}
                  disabled={true}
                  type="text"
                  value={
                    this.state.from !== null
                      ? parseInt(this.state.noOfDays) < 1
                        ? dayjs(this.state.from)
                            .add(0, 'day')
                            .format('DD-MMM-YYYY')
                            .toString()
                        : dayjs(this.state.from)
                            .add(parseInt(this.state.noOfDays), 'day')
                            .subtract(1, 'day')
                            .format('DD-MMM-YYYY')
                            .toString()
                      : 'Select a date'
                  }
                  errors={errors.to}
                  containerStyles={styles.marginBottom20}
                />
              </FormRow>
              {this.state.from !== null ? <div>abcd</div> : null}
              <RadioButton
                name="isVacation"
                content="Is it a vacation?"
                value={this.state.isVacation}
                onClick={this.radioClickHandler}
                errors={errors.isVacation}
                containerStyles={styles.marginBottom20}
              />
              <TextBox
                name="reason"
                label="Reason"
                bigLabel={true}
                type="text"
                value={this.state.reason}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.reason}
                containerStyles={styles.marginBottom20}
              />
              <TextArea
                name="address"
                label="Address for communication"
                infoText="(if permission is required to go out-of-station)"
                bigLabel={true}
                type="text"
                value={this.state.address}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.address}
                containerStyles={styles.marginBottom20}
              />
              <ButtonSubmit
                className={styles.marginBottom20}
                isLoading={this.state.isSubmitting}>
                Submit Application
              </ButtonSubmit>
            </Fragment>
          ) : null}
        </form>
      </Fragment>
    );
  };
}

export default withRouter(LeaveApplication);
