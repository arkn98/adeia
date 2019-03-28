import React, { Fragment, Component } from 'react';
import styles from './AddAdmin.module.scss';
import {
  TextBox,
  SelectBox,
  RadioButtonGroup
} from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import staffTypes from 'data/staffTypes';
import accountTypes from 'data/accountTypes';

class AddAdmin extends Component {
  state = {
    isSubmitting: false,
    errors: {},
    staffId: '',
    accountType: '0',
    name: '',
    email: '',
    password: '',
    password2: '',
    designation: '',
    category: 'rt'
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

  radioClickHandler = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });

    const newUser = {
      accountType: parseInt(this.state.accountType),
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      staffId: this.state.staffId,
      name: this.state.name,
      designation: this.state.designation,
      category:
        this.state.category !== ''
          ? staffTypes.staffTypes.find(x => x.value === this.state.category)
              .label
          : '',
      staffType: this.state.category
    };

    const newProfile = {
      staffId: this.state.staffId,
      prevLogins: {},
      cplCredits: 0,
      leaveAllotted: {}
    };

    this.props.registerUser(newUser, newProfile).then(res => {
      this.setState(
        {
          ...this.state,
          isSubmitting: false,
          errors: {},
          staffId: '',
          accountType: '0',
          name: '',
          email: '',
          password: '',
          password2: '',
          designation: '',
          category: 'rt'
        },
        () => {
          this.props.showPopout({
            type: 'modalSingleButton',
            title: 'Action successful',
            message: 'Privileged account successfully added.',
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
        <form onSubmit={this.formSubmitHandler}>
          <RadioButtonGroup
            name="accountType"
            label="Account Type"
            bigLabel={true}
            containerStyles={styles.marginBottom20}
            radioClickHandler={this.radioClickHandler}
            optlist={accountTypes.accountTypes.map((item, index) => {
              return {
                isChecked: this.state.accountType === item.value,
                value: item.value,
                label: item.label
              };
            })}
          />
          <TextBox
            name="staffId"
            label="Staff ID"
            bigLabel={true}
            type="text"
            value={this.state.staffId}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.staffId}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="email"
            label="Email"
            bigLabel={true}
            type="email"
            value={this.state.email}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.email}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="name"
            label="Name"
            bigLabel={true}
            type="text"
            value={this.state.name}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.name}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="designation"
            label="Designation"
            bigLabel={true}
            type="text"
            value={this.state.designation}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.designation}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="password"
            label="Password"
            bigLabel={true}
            type="password"
            value={this.state.password}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.password}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="password2"
            label="Re-enter Password"
            bigLabel={true}
            type="password"
            value={this.state.password2}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.password2}
            containerStyles={styles.marginBottom20}
          />
          <SelectBox
            name="category"
            label="Category"
            bigLabel={true}
            value={this.state.category}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.category}
            containerStyles={styles.marginBottom20}
            optList={staffTypes.staffTypes}
          />
          <ButtonSubmit
            className={styles.marginBottom20}
            isLoading={this.state.isSubmitting}>
            Add Privileged Account
          </ButtonSubmit>
        </form>
      </Fragment>
    );
  };
}

export default AddAdmin;
