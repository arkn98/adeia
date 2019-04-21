import React, { Fragment, Component } from 'react';
import {
  Form,
  SectionLabel,
  SelectBox,
  SelectSearch
} from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import { staffTypeSelectOptions, leaveTypesLabels } from 'data';
import styles from './AddUpdateLeaveAllocation.module.scss';

class AddUpdateLeaveAllocation extends Component {
  state = {
    isSubmitting: false,
    isUpdateSubmitting: false,
    errors: {},
    leaveTypesAllowedUpdate: [],
    staffTypeSelect: ''
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
    this.props.getAllLeaveAllocations();
  };

  inputOnChangeHandler = event => {
    const temp = {};
    if (event.target.name === 'staffTypeSelect') {
      const value = event.target.value;
      const allocObj = this.props.leaveAllocations.leaveAllocationList.find(
        x => x.staffType === value
      );
      if (typeof allocObj !== 'undefined') {
        temp['leaveTypesAllowedUpdate'] = allocObj.leaveTypesAllowed.map(
          x => x.leaveType
        );
      } else {
        temp['leaveTypesAllowedUpdate'] = [];
      }
    }
    this.setState({ [event.target.name]: event.target.value, ...temp });
  };

  entryMultiSelectOnChangeHandler = (value, index = undefined, name) => {
    this.setState({
      ...this.state,
      [name]: Array.isArray(value) ? value.map(x => x.value) : []
    });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    if (
      !window.confirm(
        'Warning! If you are not sure what you are doing, please click the Cancel button. This action can cause significant problems to the system. Also, please make sure the new class code is not same as other class codes.'
      )
    ) {
      return;
    }
    this.setState({ ...this.state, isUpdateSubmitting: true });

    const data = {
      staffTypeSelect: this.state.staffTypeSelect,
      leaveTypesAllowedUpdate: this.state.leaveTypesAllowedUpdate
    };

    this.props.updateLeaveAllocation(data).then(res => {
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
              message: 'Leave allocation successfully updated.',
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
        <Form onSubmit={this.formSubmitHandler} showBottomSpace={true}>
          <SectionLabel
            containerStyles={styles.marginBottom20}
            label="Update Leave Allocation"
          />
          <SelectBox
            name="staffTypeSelect"
            label="Staff Type"
            value={this.state.staffTypeSelect}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.staffTypeSelect}
            containerStyles={styles.marginBottom20}
            optList={staffTypeSelectOptions}
          />
          {this.state.staffTypeSelect !== '' ? (
            <Fragment>
              <SelectSearch
                name="leaveTypesAllowedUpdate"
                label="Allowed Leave types"
                propStyles={{ flex: '0 1 auto' }}
                bigLabel={true}
                isMultiSelect={true}
                isDarkTheme={this.props.utils.isDarkTheme}
                value={this.state.leaveTypesAllowedUpdate.map(leaveTypes => {
                  return {
                    value: leaveTypes,
                    label: `${leaveTypes} - ${leaveTypesLabels[leaveTypes]} - ${
                      this.props.leaveTypes.leaveTypeList.find(
                        x => x.leaveType === leaveTypes
                      ).noOfDays
                    }`
                  };
                })}
                inputOnChangeHandler={this.entryMultiSelectOnChangeHandler}
                errors={errors.courseCode}
                optList={this.props.leaveTypes.leaveTypeList.map(item => {
                  return {
                    label: `${item.leaveType} - ${
                      leaveTypesLabels[item.leaveType]
                    } - ${item.noOfDays}`,
                    value: item.leaveType
                  };
                })}
                isSearchable={true}
                containerStyles={styles.marginBottom20}
              />
              <ButtonSubmit
                sizeSmall={true}
                className={styles.marginBottom20}
                isLoading={this.state.isUpdateSubmitting}>
                Update Leave Allocation
              </ButtonSubmit>
            </Fragment>
          ) : null}
        </Form>
      </Fragment>
    );
  };
}

export default AddUpdateLeaveAllocation;
