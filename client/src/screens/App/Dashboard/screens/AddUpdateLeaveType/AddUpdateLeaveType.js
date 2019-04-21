import React, { Fragment, Component } from 'react';
import {
  TextBox,
  Form,
  SectionLabel,
  SelectBox
} from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import styles from './AddUpdateLeaveType.module.scss';
import { leaveTypesLabels } from 'data';

class AddUpdateLeaveType extends Component {
  state = {
    isSubmitting: false,
    isUpdateSubmitting: false,
    errors: {},
    leaveTypeSelect: '',
    noOfDaysUpdate: ''
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        ...this.state,
        errors: nextProps.errors,
        isSubmitting: false,
        isUpdateSubmitting: false
      });
    }
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(this.props.pageTitle);
    this.props.getAllLeaveTypes();
  };

  inputOnChangeHandler = event => {
    const temp = {};
    if (event.target.name === 'leaveTypeSelect') {
      const value = event.target.value;
      const leaveTypeObj = this.props.leaveTypes.leaveTypeList.find(
        x => value === x.leaveType
      );
      if (typeof leaveTypeObj !== 'undefined') {
        temp['noOfDaysUpdate'] = leaveTypeObj.noOfDays;
      } else {
        temp['noOfDaysUpdate'] = '';
      }
    }
    this.setState({ [event.target.name]: event.target.value, ...temp });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    if (
      !window.confirm(
        'Warning! If you are not sure what you are doing, please click the Cancel button. This action can cause significant problems to the system. Also, please make sure the new leave type is not same as other leave types. '
      )
    ) {
      return;
    }
    this.setState({ ...this.state, isUpdateSubmitting: true });

    const data = {
      leaveTypeSelect: this.state.leaveTypeSelect,
      noOfDaysUpdate: this.state.noOfDaysUpdate
    };

    this.props.updateLeaveType(data).then(res => {
      this.props.getAllLeaveTypes().then(response => {
        this.setState(
          {
            ...this.state,
            isUpdateSubmitting: false,
            errors: {}
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Leave type successfully updated.',
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
        {/* <Form onSubmit={this.formSubmitHandler}>
          <SectionLabel
            containerStyles={styles.marginBottom20}
            label="Add Leave type"
          />
          <TextBox
            name="leaveType"
            label="Leave type"
            type="text"
            value={this.state.leaveType}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.leaveType}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="noOfDays"
            label="No. of Days"
            type="text"
            value={this.state.noOfDays}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.noOfDays}
            containerStyles={styles.marginBottom20}
          />
          <ButtonSubmit
            sizeSmall={true}
            className={styles.marginBottom20}
            isLoading={this.state.isSubmitting}>
            Add Leave type
          </ButtonSubmit>
          <Divider />
        </Form> */}
        <Form onSubmit={this.formSubmitHandler} showBottomSpace={true}>
          <SectionLabel
            containerStyles={styles.marginBottom20}
            label="Update Leave type"
          />
          <SelectBox
            name="leaveTypeSelect"
            label="Select Leave type"
            value={this.state.leaveTypeSelect}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.leaveTypeSelect}
            containerStyles={styles.marginBottom20}
            makePlaceholderOptionDisabled={false}
            optList={this.props.leaveTypes.leaveTypeList.map((item, index) => {
              return {
                label: `${item.leaveType} - ${
                  leaveTypesLabels[item.leaveType]
                } - ${item.noOfDays}`,
                value: item.leaveType
              };
            })}
          />
          {this.state.leaveTypeSelect !== '' ? (
            <Fragment>
              <TextBox
                name="noOfDaysUpdate"
                label="New No. of Days"
                type="text"
                value={this.state.noOfDaysUpdate}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.noOfDaysUpdate}
                containerStyles={styles.marginBottom20}
              />
              <ButtonSubmit
                sizeSmall={true}
                className={styles.marginBottom20}
                isLoading={this.state.isUpdateSubmitting}>
                Update Leave type
              </ButtonSubmit>
            </Fragment>
          ) : null}
        </Form>
      </Fragment>
    );
  };
}

export default AddUpdateLeaveType;
