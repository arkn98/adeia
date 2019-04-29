import React, { Fragment, Component } from 'react';
import {
  TextBox,
  Form,
  SectionLabel,
  SelectBox,
  Divider
} from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import styles from './AddUpdateClassGroup.module.scss';

class AddUpdateClassGroup extends Component {
  state = {
    isSubmitting: false,
    isUpdateSubmitting: false,
    errors: {},
    classGroupCode: '',
    nameOfClassGroup: '',
    classGroupCodeSelect: '',
    classGroupCodeUpdate: '',
    nameOfClassGroupUpdate: ''
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
    this.props.getAllClassGroups();
  };

  inputOnChangeHandler = event => {
    const temp = {};
    if (event.target.name === 'classGroupCodeSelect') {
      const value = event.target.value;
      const courseObj = this.props.classGroups.classGroupList.find(
        x => value === x.classGroupCode
      );
      if (typeof courseObj !== 'undefined') {
        temp['nameOfClassGroupUpdate'] = courseObj.nameOfClassGroup;
        temp['classGroupCodeUpdate'] = courseObj.classGroupCode;
      } else {
        temp['nameOfClassGroupUpdate'] = '';
        temp['classGroupCodeUpdate'] = '';
      }
    }
    this.setState({ [event.target.name]: event.target.value, ...temp });
  };

  updateClassGroupSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isUpdateSubmitting: true });
    if (
      !window.confirm(
        'Warning! If you are not sure what you are doing, please click the Cancel button. This action can cause significant problems to the system. Also, please make sure the new class code is not same as other class codes. '
      )
    ) {
      return;
    }

    const data = {
      classGroupCodeSelect: this.state.classGroupCodeSelect,
      classGroupCodeUpdate: this.state.classGroupCodeUpdate,
      nameOfClassGroupUpdate: this.state.nameOfClassGroupUpdate
    };

    this.props.updateClassGroup(data).then(res => {
      this.props.getAllClassGroups().then(response => {
        this.setState(
          {
            ...this.state,
            isUpdateSubmitting: false,
            errors: {},
            classGroupCodeSelect: '',
            classGroupCodeUpdate: '',
            nameOfClassGroupUpdate: ''
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Class Group successfully updated.',
              buttonPrimary: true,
              buttonContent: 'Okay'
            });
          }
        );
      });
    });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });

    const data = {
      nameOfClassGroup: this.state.nameOfClassGroup,
      classGroupCode: this.state.classGroupCode
    };

    this.props.addClassGroup(data, this.props.history).then(res => {
      this.props.getAllClassGroups().then(response => {
        this.setState(
          {
            ...this.state,
            isSubmitting: false,
            errors: {},
            classGroupCode: '',
            nameOfClassGroup: ''
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Class group successfully added.',
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
        <Form onSubmit={this.formSubmitHandler}>
          <SectionLabel
            containerStyles={styles.marginBottom20}
            label="Add Class Group"
          />
          <TextBox
            name="classGroupCode"
            label="Class group Code"
            type="text"
            value={this.state.classGroupCode}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.classGroupCode}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="nameOfClassGroup"
            label="Class group Name"
            type="text"
            value={this.state.nameOfClassGroup}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.nameOfClassGroup}
            containerStyles={styles.marginBottom20}
          />
          <ButtonSubmit
            sizeSmall={true}
            className={styles.marginBottom20}
            isLoading={this.state.isSubmitting}>
            Add Class group
          </ButtonSubmit>
          <Divider />
        </Form>
        <Form
          onSubmit={this.updateClassGroupSubmitHandler}
          showBottomSpace={true}>
          <SectionLabel
            containerStyles={styles.marginBottom20}
            label="Update Class Group"
          />
          <SelectBox
            name="classGroupCodeSelect"
            label="Select Class group"
            value={this.state.classGroupCodeSelect}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.classGroupCodeSelect}
            containerStyles={styles.marginBottom20}
            makePlaceholderOptionDisabled={false}
            optList={this.props.classGroups.classGroupList.map(
              (item, index) => {
                return {
                  label: `${item.classGroupCode} - ${item.nameOfClassGroup}`,
                  value: item.classGroupCode
                };
              }
            )}
          />
          {this.state.classGroupCodeSelect !== '' ? (
            <Fragment>
              <TextBox
                name="classGroupCodeUpdate"
                label="New Class group Code"
                type="text"
                value={this.state.classGroupCodeUpdate}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.classGroupCodeUpdate}
                containerStyles={styles.marginBottom20}
              />
              <TextBox
                name="nameOfClassGroupUpdate"
                label="New Class Group Name"
                type="text"
                value={this.state.nameOfClassGroupUpdate}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.nameOfClassGroupUpdate}
                containerStyles={styles.marginBottom20}
              />
              <ButtonSubmit
                sizeSmall={true}
                className={styles.marginBottom20}
                isLoading={this.state.isUpdateSubmitting}>
                Update Class Group
              </ButtonSubmit>
            </Fragment>
          ) : null}
        </Form>
      </Fragment>
    );
  };
}

export default AddUpdateClassGroup;
