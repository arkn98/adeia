import React, { Fragment, Component } from 'react';
import styles from './AddStaff.module.scss';
import { TextBox, SelectBox } from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import staffTypes from 'data/staffTypes';

class AddStaff extends Component {
  state = {
    isSubmitting: false,
    errors: {},
    staffId: '',
    name: '',
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

  formSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });

    /*
    let staffType = this.state.category;
    
    if (this.state.category === 'Regular Teaching Staff') staffType = 'rt';
    else if (this.state.category === 'Regular Non-Teaching Staff')
      staffType = 'rnt';
    else if (this.state.category === 'Teaching Fellows') staffType = 'tf';
    else if (this.state.category === 'Non-Teaching - No Leave')
      staffType = 'nt';
    else if (this.state.category === 'Research Scholars - 30')
      staffType = 'rs30';
    else if (this.state.category === 'Research Scholars - 20')
      staffType = 'rs20';
    else if (this.state.category === 'Research Scholars - Others')
      staffType = 'rso';
    else if (this.state.category === 'Others') staffType = 'oth';
    else staffType = null; */

    const newUser = {
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

    this.props.registerStaff(newUser, newProfile).then(res => {
      this.setState(
        {
          ...this.state,
          isSubmitting: false,
          errors: {},
          staffId: '',
          name: '',
          designation: '',
          category: 'rt'
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
        <form onSubmit={this.formSubmitHandler}>
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
            Add Staff
          </ButtonSubmit>
        </form>
      </Fragment>
    );
  };
}

export default AddStaff;
