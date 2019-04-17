import React, { Component, Fragment } from 'react';
import {
  TextBox,
  Form,
  SectionLabel,
  SelectBox
} from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import styles from './EditStaff.module.scss';
import { staffTypeSelectOptions } from 'data';

class EditStaff extends Component {
  state = {
    isSubmitting: false,
    errors: {},
    staffIdSelect: '',
    name: '',
    designation: '',
    email: '',
    category: ''
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
    this.props.getAllStaff();
  };

  inputOnChangeHandler = event => {
    const temp = {};
    if (event.target.name === 'staffIdSelect') {
      const value = event.target.value;
      const staffObj = this.props.staff.staffList.find(
        x => value === x.staffId
      );
      if (typeof staffObj !== 'undefined') {
        temp['name'] = staffObj.name;
        temp['designation'] = staffObj.designation;
        temp['email'] = staffObj.email;
        temp['category'] = staffObj.staffType;
      } else {
        temp['name'] = '';
        temp['designation'] = '';
        temp['email'] = '';
        temp['category'] = '';
      }
    }
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      ...temp
    });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    if (
      !window.confirm(
        'Warning! If you are not sure what you are doing, please click the Cancel button. This action can cause significant problems to the system. Also, please make sure the new class code is not same as other class codes. '
      )
    ) {
      return;
    }
    this.setState({ ...this.state, isSubmitting: true });

    const data = {
      staffIdSelect: this.state.staffIdSelect,
      name: this.state.name,
      designation: this.state.designation,
      email: this.state.email,
      category:
        this.state.category !== ''
          ? staffTypeSelectOptions.find(x => x.value === this.state.category)
              .label
          : '',
      staffType: this.state.category
    };

    this.props.updateStaff(data).then(res => {
      console.log(res);
      this.props.getAllStaff().then(response => {
        this.setState(
          {
            ...this.state,
            isSubmitting: false,
            errors: {}
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Staff successfully updated.',
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
            label="Update Details"
          />
          <SelectBox
            name="staffIdSelect"
            label="Select Staff To Edit"
            value={this.state.staffIdSelect}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.staffIdSelect}
            containerStyles={styles.marginBottom20}
            makePlaceholderOptionDisabled={false}
            optList={this.props.staff.staffList.map((item, index) => {
              return {
                label: `${item.staffId} - ${item.name}`,
                value: item.staffId
              };
            })}
          />
          {this.state.staffIdSelect !== '' ? (
            <Fragment>
              <TextBox
                name="name"
                label="New Name"
                type="text"
                value={this.state.name}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.name}
                containerStyles={styles.marginBottom20}
              />
              <TextBox
                name="designation"
                label="New Designation"
                type="text"
                value={this.state.designation}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.designation}
                containerStyles={styles.marginBottom20}
              />
              <TextBox
                name="email"
                label="New Email"
                type="text"
                value={this.state.email}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.email}
                containerStyles={styles.marginBottom20}
              />
              <SelectBox
                name="category"
                label="New Category"
                value={this.state.category}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.category}
                containerStyles={styles.marginBottom20}
                optList={staffTypeSelectOptions}
              />
              <ButtonSubmit
                sizeSmall={true}
                className={styles.marginBottom20}
                isLoading={this.state.isSubmitting}>
                Update Staff
              </ButtonSubmit>
            </Fragment>
          ) : null}
        </Form>
      </Fragment>
    );
  };
}

export default EditStaff;
