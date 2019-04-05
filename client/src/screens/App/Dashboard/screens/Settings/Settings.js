import React, { Component, Fragment } from 'react';
import styles from './Settings.module.scss';
import {
  TextBox,
  Divider,
  SectionLabel,
  Form
} from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';

class Settings extends Component {
  state = {
    isSubmitting: false,
    errors: {},
    name: this.props.auth.user.name,
    designation: this.props.auth.user.designation,
    email: this.props.auth.user.email,
    currentpassword: '',
    newpassword: '',
    isChangePassword: false
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(this.props.pageTitle);
  };

  inputOnChangeHandler = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });

    const data = {
      name: this.state.name,
      designation: this.state.designation,
      email: this.state.email
    };

    this.props.updateAccount(data).then(res => {
      this.setState({ ...this.state, isSubmitting: false }, () => {
        this.props.showPopout({});
      });
    });
  };

  changePassFormSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });
  };

  showPasswordChange = event => {
    event.preventDefault();
    this.setState({ ...this.state, isChangePassword: true });
  };

  render = () => {
    const { errors } = this.state;

    return (
      <Fragment>
        <Form onSubmit={this.formSubmitHandler}>
          <SectionLabel
            label="My Profile"
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
          <TextBox
            name="email"
            label="Email"
            type="email"
            value={this.state.email}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.email}
            containerStyles={styles.marginBottom20}
          />
          <ButtonSubmit sizeSmall={true} isLoading={this.state.isSubmitting}>
            Update Account
          </ButtonSubmit>
          <Divider />
        </Form>
        <Form
          onSubmit={this.changePassFormSubmitHandler}
          showBottomSpace={true}>
          <SectionLabel
            containerStyles={styles.marginBottom20}
            label="Change Password"
          />
          <TextBox
            name="currentpassword"
            label="Current Password"
            type="password"
            value={this.state.currentpassword}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.currentpassword}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="newpassword"
            label="New Password"
            /* bigLabel={true} */
            type="password"
            value={this.state.newpassword}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.newpassword}
            containerStyles={styles.marginBottom20}
          />
          <ButtonSubmit sizeSmall={true} isLoading={this.state.isSubmitting}>
            Update Password
          </ButtonSubmit>
        </Form>
      </Fragment>
    );
  };
}

export default Settings;
