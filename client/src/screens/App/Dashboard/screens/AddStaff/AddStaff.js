import React, { Fragment, Component } from 'react';
import styles from './AddStaff.module.scss';
import {
  TextBox,
  Form,
  SelectBox,
  SectionLabel
} from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import { staffTypes, staffTypeSelectOptions } from 'data';

class AddStaff extends Component {
  state = {
    isSubmitting: false,
    errors: {},
    staffId: '',
    name: '',
    designation: '',
    category: staffTypes.RT
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
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });

    const newUser = {
      staffId: this.state.staffId,
      name: this.state.name,
      designation: this.state.designation,
      category:
        this.state.category !== ''
          ? staffTypeSelectOptions.find(x => x.value === this.state.category)
              .label
          : '',
      staffType: this.state.category
    };

    this.props
      .registerStaff(newUser, { staffId: this.state.staffId })
      .then(res => {
        this.setState(
          {
            ...this.state,
            isSubmitting: false,
            errors: {},
            staffId: '',
            name: '',
            designation: '',
            category: staffTypes.RT
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Staff account successfully added.',
              buttonPrimary: true,
              buttonContent: 'Okay'
            });
          }
        );
      });
  };

  render = () => {
    const { errors } = this.state;

    return (
      <Fragment>
        <Form onSubmit={this.formSubmitHandler} showBottomSpace={true}>
          <SectionLabel
            containerStyles={styles.marginBottom20}
            label="Account Details"
          />
          <TextBox
            name="staffId"
            label="Staff ID"
            type="text"
            value={this.state.staffId}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.staffId}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="name"
            label="Name"
            type="text"
            value={this.state.name}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.name}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="designation"
            label="Designation"
            type="text"
            value={this.state.designation}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.designation}
            containerStyles={styles.marginBottom20}
          />
          <SelectBox
            name="category"
            label="Category"
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
            Add Staff
          </ButtonSubmit>
        </Form>
      </Fragment>
    );
  };
}

export default AddStaff;
