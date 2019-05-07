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
    isChangePasswordSubmitting: false,
    errors: {},
    name: this.props.auth.user.name,
    designation: this.props.auth.user.designation,
    email: this.props.auth.user.email,
    currentpassword: '',
    newpassword: ''
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(this.props.pageTitle);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        ...this.state,
        errors: nextProps.errors,
        isSubmitting: false,
        isChangePasswordSubmitting: false
      });
    }
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

    this.props.selfUpdateAccount(data).then(res => {
      this.setState({ ...this.state, isSubmitting: false }, () => {
        this.props.getCurrentUser(this.props.auth.user.id).then(result => {
          this.props.showPopout({
            type: 'modalSingleButton',
            title: 'Action successful',
            message: 'Profile successfully updated.',
            buttonPrimary: true,
            buttonContent: 'Okay'
          });
        });
      });
    });
  };

  changePassFormSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isChangePasswordSubmitting: true });

    const data = {
      currentpassword: this.state.currentpassword,
      newpassword: this.state.newpassword
    };

    this.props.selfUpdatePassword(data).then(res => {
      this.setState({ ...this.state, isSubmitting: false }, () => {
        this.props.showPopout({
          type: 'modalSingleButton',
          title: 'Action successful',
          message: 'Password successfully changed.',
          buttonPrimary: true,
          buttonContent: 'Okay'
        });
      });
    });
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
            description="This will be your future sign-ins."
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
            type="password"
            description="Must be atleast 8 characters long."
            value={this.state.newpassword}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.newpassword}
            containerStyles={styles.marginBottom20}
          />
          <ButtonSubmit
            sizeSmall={true}
            isLoading={this.state.isChangePasswordSubmitting}>
            Update Password
          </ButtonSubmit>
        </Form>
      </Fragment>
    );
  };
}

export default Settings;
