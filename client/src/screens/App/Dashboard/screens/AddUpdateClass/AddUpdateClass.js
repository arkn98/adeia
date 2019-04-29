import React, { Fragment, Component } from 'react';
import {
  TextBox,
  Form,
  SectionLabel,
  SelectBox,
  Divider
} from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import styles from './AddUpdateClass.module.scss';

class AddUpdateClass extends Component {
  state = {
    isSubmitting: false,
    isUpdateSubmitting: false,
    errors: {},
    classCode: '',
    nameOfClass: '',
    classGroupCode: '',
    classCodeSelect: '',
    classCodeUpdate: '',
    nameOfClassUpdate: '',
    classGroupCodeUpdate: ''
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
    this.props.getAllClasses();
    this.props.getAllClassGroups();
  };

  inputOnChangeHandler = event => {
    const temp = {};
    if (event.target.name === 'classCodeSelect') {
      const value = event.target.value;
      const classObj = this.props.classes.classList.find(
        x => value === x.classCode
      );
      if (typeof classObj !== 'undefined') {
        temp['nameOfClassUpdate'] = classObj.nameOfClass;
        temp['classCodeUpdate'] = classObj.classCode;
        temp['classGroupCodeUpdate'] = classObj.classGroup.classGroupCode;
      } else {
        temp['nameOfClassUpdate'] = '';
        temp['classCodeUpdate'] = '';
        temp['classGroupCodeUpdate'] = '';
      }
    }
    this.setState({ [event.target.name]: event.target.value, ...temp });
  };

  updateClassSubmitHandler = event => {
    event.preventDefault();
    if (
      !window.confirm(
        'Warning! If you are not sure what you are doing, please click the Cancel button. This action can cause significant problems to the system. Also, please make sure the new class code is not same as other class codes. '
      )
    ) {
      return;
    }
    this.setState({ ...this.state, isUpdateSubmitting: true });

    const data = {
      classCodeSelect: this.state.classCodeSelect,
      nameOfClassUpdate: this.state.nameOfClassUpdate,
      classCodeUpdate: this.state.classCodeUpdate,
      classGroupCodeUpdate: this.state.classGroupCodeUpdate
    };

    this.props.updateClass(data).then(res => {
      Promise.all([
        this.props.getAllClasses(),
        this.props.getAllClassGroups()
      ]).then(response => {
        this.setState(
          {
            ...this.state,
            isUpdateSubmitting: false,
            errors: {},
            classCodeSelect: '',
            classCodeUpdate: '',
            nameOfClassUpdate: '',
            classGroupCodeUpdate: ''
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Class successfully updated.',
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
      nameOfClass: this.state.nameOfClass,
      classCode: this.state.classCode,
      classGroupCode: this.state.classGroupCode
    };

    this.props.addClass(data).then(res => {
      Promise.all([
        this.props.getAllClasses(),
        this.props.getAllClassGroups()
      ]).then(response => {
        this.setState(
          {
            ...this.state,
            isSubmitting: false,
            errors: {},
            classCode: '',
            nameOfClass: '',
            classGroupCode: ''
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Class successfully added.',
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
            label="Add Class"
          />
          <TextBox
            name="classCode"
            label="Class Code"
            type="text"
            value={this.state.classCode}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.classCode}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="nameOfClass"
            label="Class Name"
            type="text"
            value={this.state.nameOfClass}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.nameOfClass}
            containerStyles={styles.marginBottom20}
          />
          <SelectBox
            name="classGroupCode"
            label="Select Class Group"
            value={this.state.classGroupCode}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.classGroupCode}
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
          <ButtonSubmit
            sizeSmall={true}
            className={styles.marginBottom20}
            isLoading={this.state.isSubmitting}>
            Add Class
          </ButtonSubmit>
          <Divider />
        </Form>
        <Form onSubmit={this.updateClassSubmitHandler} showBottomSpace={true}>
          <SectionLabel
            containerStyles={styles.marginBottom20}
            label="Update Class"
          />
          <SelectBox
            name="classCodeSelect"
            label="Select Class"
            value={this.state.classCodeSelect}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.classCodeSelect}
            containerStyles={styles.marginBottom20}
            makePlaceholderOptionDisabled={false}
            optList={this.props.classes.classList.map((item, index) => {
              return {
                label: `${item.classCode} - ${item.nameOfClass}`,
                value: item.classCode
              };
            })}
          />
          {this.state.classCodeSelect !== '' ? (
            <Fragment>
              <TextBox
                name="classCodeUpdate"
                label="New Class Code"
                type="text"
                value={this.state.classCodeUpdate}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.classCodeUpdate}
                containerStyles={styles.marginBottom20}
              />
              <TextBox
                name="nameOfClassUpdate"
                label="New Class Name"
                type="text"
                value={this.state.nameOfClassUpdate}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.nameOfClassUpdate}
                containerStyles={styles.marginBottom20}
              />
              <SelectBox
                name="classGroupCodeUpdate"
                label="New Class Group"
                value={this.state.classGroupCodeUpdate}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.classGroupCodeUpdate}
                containerStyles={styles.marginBottom20}
                makePlaceholderOptionDisabled={false}
                optList={this.props.classGroups.classGroupList.map(
                  (item, index) => {
                    return {
                      label: `${item.classGroupCode} - ${
                        item.nameOfClassGroup
                      }`,
                      value: item.classGroupCode
                    };
                  }
                )}
              />
              <ButtonSubmit
                sizeSmall={true}
                className={styles.marginBottom20}
                isLoading={this.state.isUpdateSubmitting}>
                Update Class
              </ButtonSubmit>
            </Fragment>
          ) : null}
        </Form>
      </Fragment>
    );
  };
}

export default AddUpdateClass;
