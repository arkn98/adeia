import React, { Fragment, Component } from 'react';
import {
  TextBox,
  Form,
  SectionLabel,
  SelectBox,
  Divider
} from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import styles from './MiscSettings.module.scss';

class MiscSettings extends Component {
  state = {
    isSubmitting: false,
    isUpdateSubmitting: false,
    errors: {},
    courseCode: '',
    nameOfCourse: '',
    courseCodeSelect: '',
    courseCodeUpdate: '',
    nameOfCourseUpdate: ''
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
    this.props.getAllCourses();
  };

  inputOnChangeHandler = event => {
    const temp = {};
    if (event.target.name === 'courseCodeSelect') {
      const value = event.target.value;
      const courseObj = this.props.courses.courseList.find(
        x => value === x.courseCode
      );
      if (typeof courseObj !== 'undefined') {
        temp['nameOfCourseUpdate'] = courseObj.nameOfCourse;
        temp['courseCodeUpdate'] = courseObj.courseCode;
      } else {
        temp['nameOfCourseUpdate'] = '';
        temp['courseCodeUpdate'] = '';
      }
    }
    this.setState({ [event.target.name]: event.target.value, ...temp });
  };

  updateCourseSubmitHandler = event => {
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
      courseCodeSelect: this.state.courseCodeSelect,
      courseCodeUpdate: this.state.courseCodeUpdate,
      nameOfCourseUpdate: this.state.nameOfCourseUpdate
    };

    this.props.updateCourse(data).then(res => {
      this.props.getAllCourses().then(response => {
        this.setState(
          {
            ...this.state,
            isUpdateSubmitting: false,
            errors: {},
            courseCodeSelect: '',
            courseCodeUpdate: '',
            nameOfCourseUpdate: ''
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Course successfully updated.',
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
      nameOfCourse: this.state.nameOfCourse,
      courseCode: this.state.courseCode
    };

    this.props.addCourse(data, this.props.history).then(res => {
      this.props.getAllCourses().then(response => {
        this.setState(
          {
            ...this.state,
            isSubmitting: false,
            errors: {},
            courseCode: '',
            nameOfCourse: ''
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action successful',
              message: 'Course successfully added.',
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
            bigLabel={false}
            containerStyles={styles.marginBottom20}
            label="Academic Year"
          />
          <TextBox
            name="courseCode"
            label="Course Code"
            type="text"
            value={this.state.courseCode}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.courseCode}
            containerStyles={styles.marginBottom20}
          />
          <TextBox
            name="nameOfCourse"
            label="Course Name"
            type="text"
            value={this.state.nameOfCourse}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.nameOfCourse}
            containerStyles={styles.marginBottom20}
          />
          <ButtonSubmit
            sizeSmall={true}
            className={styles.marginBottom20}
            isLoading={this.state.isSubmitting}>
            Add Course
          </ButtonSubmit>
          <Divider />
        </Form>
        <Form onSubmit={this.updateCourseSubmitHandler} showBottomSpace={true}>
          <SectionLabel
            containerStyles={styles.marginBottom20}
            label="Update Course"
          />
          <SelectBox
            name="courseCodeSelect"
            label="Select Course"
            value={this.state.courseCodeSelect}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.courseCodeSelect}
            containerStyles={styles.marginBottom20}
            makePlaceholderOptionDisabled={false}
            optList={this.props.courses.courseList.map((item, index) => {
              return {
                label: `${item.courseCode} - ${item.nameOfCourse}`,
                value: item.courseCode
              };
            })}
          />
          {this.state.courseCodeSelect !== '' ? (
            <Fragment>
              <TextBox
                name="courseCodeUpdate"
                label="New Course Code"
                type="text"
                value={this.state.courseCodeUpdate}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.courseCodeUpdate}
                containerStyles={styles.marginBottom20}
              />
              <TextBox
                name="nameOfCourseUpdate"
                label="New Course Name"
                type="text"
                value={this.state.nameOfCourseUpdate}
                inputOnChangeHandler={this.inputOnChangeHandler}
                errors={errors.nameOfCourseUpdate}
                containerStyles={styles.marginBottom20}
              />
              <ButtonSubmit
                sizeSmall={true}
                className={styles.marginBottom20}
                isLoading={this.state.isUpdateSubmitting}>
                Update Course
              </ButtonSubmit>
            </Fragment>
          ) : null}
        </Form>
      </Fragment>
    );
  };
}

export default MiscSettings;
