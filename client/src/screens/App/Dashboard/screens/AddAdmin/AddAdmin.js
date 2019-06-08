import React, { Fragment, Component } from 'react';
// import styles from './AddAdmin.module.scss';
import {
  TextBox,
  SelectBox,
  RadioButtonGroup,
  Form,
  SectionLabel,
  Description
} from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import {
  accountTypeSelectOptions,
  accountTypes,
  staffTypes,
  staffTypeSelectOptions
} from 'data';

class AddAdmin extends Component {
  state = {
    isSubmitting: false,
    errors: {},
    staffId: '',
    accountType: accountTypes.ADMIN,
    name: '',
    email: '',
    password: '',
    password2: '',
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

  radioClickHandler = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });

    const newUser = {
      accountType: this.state.accountType,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
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
      .registerUser(newUser, { staffId: this.state.staffId })
      .then(res => {
        this.setState(
          {
            ...this.state,
            isSubmitting: false,
            errors: {},
            staffId: '',
            name: '',
            email: '',
            password: '',
            password2: '',
            designation: ''
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
        <Form onSubmit={this.formSubmitHandler} showBottomSpace={true}>
          <SectionLabel label="Account Details" />
          <RadioButtonGroup
            name="accountType"
            label="Account Type"
            description="Access permissions depend on account type. This cannot be changed afterwards."
            containerStyles="marginBottom20"
            radioClickHandler={this.radioClickHandler}
            optlist={accountTypeSelectOptions
              .filter(item => item.value !== accountTypes.STAFF)
              .map((item, index) => {
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
            type="text"
            description="Primary account identifier used throughout the system. Please make sure this stays constant."
            value={this.state.staffId}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.staffId}
            containerStyles="marginBottom20"
          />
          <TextBox
            name="name"
            label="Name"
            type="text"
            value={this.state.name}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.name}
            containerStyles="marginBottom20"
          />
          <TextBox
            name="designation"
            label="Designation"
            type="text"
            value={this.state.designation}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.designation}
            containerStyles="marginBottom20"
          />
          <SelectBox
            name="category"
            label="Category"
            value={this.state.category}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.category}
            containerStyles="marginBottom20"
            optList={staffTypeSelectOptions}
          />
          <SectionLabel containerStyles="marginBottom4" label="Credentials" />
          <Description>
            These are the actual credentials used to login to the account.
          </Description>
          <TextBox
            name="email"
            label="Email"
            type="text"
            value={this.state.email}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.email}
            containerStyles="marginBottom20"
          />
          <TextBox
            name="password"
            label="Password"
            type="password"
            value={this.state.password}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.password}
            containerStyles="marginBottom20"
          />
          <TextBox
            name="password2"
            label="Re-enter Password"
            type="password"
            value={this.state.password2}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.password2}
            containerStyles="marginBottom20"
          />
          <ButtonSubmit
            sizeSmall={true}
            className="marginBottom20"
            isLoading={this.state.isSubmitting}>
            Add Privileged Account
          </ButtonSubmit>
        </Form>
      </Fragment>
    );
  };
}

export default AddAdmin;
