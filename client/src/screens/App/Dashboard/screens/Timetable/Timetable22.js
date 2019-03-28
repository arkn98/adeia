import React, { Component, Fragment } from 'react';
import styles from './Timetable.module.scss';
import {
  SelectBox,
  LabelWithRightChildren,
  FormRow,
  SelectSearch
} from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import { FullPageSpinner } from 'screens/App/shared/common/Spinner';
import { Prompt } from 'react-router-dom';
import { Table } from 'screens/App/shared/common/Table';
import { Slot } from 'screens/App/shared/common/Slot';
import { MdTrash, MdClose } from 'assets/icons';

class Timetable extends Component {
  state = {
    errors: {},
    isSubmitting: false,
    isLoading: true,
    classCode: '',
    showEditor: false,
    clickedDay: -1,
    clickedHour: -1,
    clickedRow: -1,
    clickedCol: -1,
    timetable: [],
    editorContent: {
      start: null,
      duration: null,
      day: null,
      entry: []
    }
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(this.props.pageTitle);
    Promise.all([
      this.props.getAllClasses(),
      this.props.getAllCourses(),
      this.props.getAllStaff()
    ]).then(res => {
      this.setState({ ...this.state, isLoading: false });
    });
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

  inputOnChangeHandler = event => {
    if (event.target.name === 'classCode' && event.target.value !== '') {
      let classId = this.props.classes.classList.find(
        x => x.classCode === event.target.value
      )._id;
      this.props
        .getTimetable(classId)
        .then(res => {
          this.setState({
            ...this.state,
            timetable: this.props.timetable.timetable,
            showEditor: false,
            clickedHour: -1,
            clickedDay: -1,
            clickedCol: -1,
            clickedRow: -1,
            editorContent: {
              start: null,
              duration: null,
              day: null,
              entry: []
            }
          });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            timetable: [],
            showEditor: false,
            clickedHour: -1,
            clickedDay: -1,
            clickedCol: -1,
            clickedRow: -1,
            editorContent: {
              start: null,
              duration: null,
              day: null,
              entry: []
            }
          });
        });
    }
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();
  };

  closeEditor = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      showEditor: false,
      clickedDay: -1,
      clickedHour: -1,
      clickedRow: -1,
      clickedCol: -1,
      editorContent: {
        start: null,
        duration: null,
        day: null,
        entry: []
      }
    });
  };

  tableCellClickHandler = (day, hour, row, col, event) => {
    event.preventDefault();
    if (
      this.state.showEditor &&
      this.state.clickedDay === day &&
      this.state.clickedHour === hour
    ) {
      this.setState({
        ...this.state,
        clickedDay: -1,
        clickedHour: -1,
        clickedRow: -1,
        clickedCol: -1,
        showEditor: false,
        editorContent: {
          start: null,
          duration: null,
          day: null,
          entry: []
        }
      });
    } else {
      const objFromTimetable = this.props.timetable.timetable[day - 1].find(
        x => x.start === hour
      );
      this.setState({
        ...this.state,
        clickedDay: day,
        clickedHour: hour,
        clickedRow: row,
        clickedCol: col,
        showEditor: true,
        editorContent: {
          day: this.days[day - 1],
          start: hour,
          duration:
            objFromTimetable !== undefined ? objFromTimetable.duration : '',
          entry:
            objFromTimetable !== undefined
              ? objFromTimetable.course
              : [
                  {
                    courseCode: '',
                    handlingStaff: '',
                    additionalStaff: []
                  }
                ]
        }
      });
    }
  };

  editorSelectOnChangeHandler = (opt, index, name) => {
    let newCourse = this.state.editorContent.entry.slice(0);
    /* if (name === 'additionalStaff') {
    } else {
    } */
    newCourse[index][name] = opt.value;
    console.log(this.state);
    this.setState(
      {
        ...this.state,
        editorContent: {
          ...this.state.editorContent,
          entry: newCourse
        }
      },
      () => {
        console.log(this.state);
      }
    );
    /* 
    this.setState({...this.state, editorContent: {...this.state.editorContent, }})
    newCourse[index][name] = opt.value;
    this.setState({
      ...this.state,
      editorContent: { ...this.state.editorContent, course: newCourse }
    }); */
  };

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  render = () => {
    const { errors } = this.state;

    let thead = ['Day', 1, 2, 3, 4, 5, 6, 7, 8];

    let tbody = [
      ['Monday'],
      ['Tuesday'],
      ['Wednesday'],
      ['Thursday'],
      ['Friday']
    ];

    this.state.timetable.forEach((day, dayIndex) => {
      let toInsertIndex = 1;
      day.forEach((hour, hourIndex) => {
        if (hour.start !== toInsertIndex) {
          while (hour.start - toInsertIndex > 0) {
            tbody[dayIndex].push({
              day: dayIndex,
              hour: toInsertIndex,
              content: null,
              colSpan: 1
            });
            toInsertIndex++;
          }
        }
        let colSpan =
          hour.start + hour.duration - toInsertIndex === 0
            ? 1
            : hour.start + hour.duration - toInsertIndex;
        tbody[dayIndex].push({
          day: dayIndex,
          hour: toInsertIndex,
          content: (
            <Slot day={dayIndex} hour={toInsertIndex}>
              {hour.course.map(courseItem => {
                return {
                  nameOfCourse: this.props.courses.courseList.find(
                    x => x.courseCode === courseItem.courseCode
                  ).nameOfCourse,
                  handlingStaff: this.props.staff.staffList.find(
                    x => x.staffId === courseItem.handlingStaff
                  ).name,
                  additionalStaff: Array.isArray(courseItem.additionalStaff)
                    ? courseItem.additionalStaff.map(x => {
                        return this.props.staff.staffList.find(
                          x2 => x2.staffId === x
                        ).name;
                      })
                    : typeof courseItem.additionalStaff === 'string' &&
                      courseItem.additionalStaff.length !== 0
                    ? this.props.staff.staffList.find(
                        x2 => x2.staffId === courseItem.additionalStaff
                      ).name
                    : ''
                };
              })}
            </Slot>
          ),
          colSpan
        });
        toInsertIndex += colSpan;
      });
      while (toInsertIndex < 9) {
        tbody[dayIndex].push({
          day: dayIndex,
          hour: toInsertIndex,
          content: null,
          colSpan: 1
        });
        toInsertIndex++;
      }
    });

    let editor = null;
    if (this.state.showEditor) {
      editor = (
        <div
          className={`${styles.inlineEditorWrapper} ${styles.marginBottom8}`}>
          <LabelWithRightChildren
            label={`UPDATE SLOT - ${this.state.editorContent.day}`}
            bigLabel={true}
            containerStyles={styles.marginBottom8}>
            <div
              className={`${styles.iconHoverWrapper} ${styles.danger}`}
              style={{ marginRight: '6px' }}>
              <MdTrash className={styles.customIconTest} />
            </div>
            <div onClick={this.closeEditor} className={styles.iconHoverWrapper}>
              <MdClose className={styles.customIconTest} />
            </div>
          </LabelWithRightChildren>
          <FormRow containerStyles={styles.marginBottom8}>
            <SelectBox
              name="start"
              label="Hour"
              bigLabel={true}
              value={this.state.editorContent.start}
              inputOnChangeHandler={this.editorContentInputOnChangeHandler}
              errors={errors.start}
              optList={[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                return {
                  label: item,
                  value: item
                };
              })}
            />
            <SelectBox
              name="duaration"
              label="Duration"
              bigLabel={true}
              value={this.state.editorContent.duration}
              inputOnChangeHandler={this.editorContentInputOnChangeHandler}
              errors={errors.duration}
              optList={[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                return {
                  label: item,
                  value: item
                };
              })}
            />
          </FormRow>
          <div className={styles.editorInner}>
            {this.state.editorContent.entry.map((courseItem, courseIndex) => {
              return (
                <FormRow containerStyles={styles.marginBottom8}>
                  <SelectSearch
                    name="courseCode"
                    label="Course"
                    bigLabel={true}
                    isDarkTheme={this.props.utils.isDarkTheme}
                    index={courseIndex}
                    value={{
                      value: courseItem.courseCode,
                      label: `${courseItem.courseCode} - ${
                        this.props.courses.courseList.find(
                          x => x.courseCode === courseItem.courseCode
                        ).nameOfCourse
                      }`
                    }}
                    inputOnChangeHandler={this.editorSelectOnChangeHandler}
                    errors={errors.courseCode}
                    optList={this.props.courses.courseList.map(courseItem => {
                      return {
                        label: `${courseItem.courseCode} - ${
                          courseItem.nameOfCourse
                        }`,
                        value: courseItem.courseCode
                      };
                    })}
                  />
                  <SelectSearch
                    name="handlingStaff"
                    label="Staff"
                    isDarkTheme={this.props.utils.isDarkTheme}
                    bigLabel={true}
                    index={courseIndex}
                    value={{
                      value: courseItem.handlingStaff,
                      label: `${courseItem.handlingStaff} - ${
                        this.props.staff.staffList.find(
                          x => x.staffId === courseItem.handlingStaff
                        ).name
                      }`
                    }}
                    inputOnChangeHandler={this.editorSelectOnChangeHandler}
                    errors={errors.handlingStaff}
                    optList={this.props.staff.staffList.map(staffItem => {
                      return {
                        label: `${staffItem.staffId} - ${staffItem.name}`,
                        value: staffItem.staffId
                      };
                    })}
                  />
                  <SelectSearch
                    name="additionalStaff"
                    label="Additional Staff"
                    bigLabel={true}
                    isDarkTheme={this.props.utils.isDarkTheme}
                    index={courseIndex}
                    isMultiSelect={true}
                    value={courseItem.additionalStaff.map(
                      additionalStaffItem => {
                        return {
                          value: additionalStaffItem,
                          label: `${additionalStaffItem} - ${
                            this.props.staff.staffList.find(
                              x => x.staffId === additionalStaffItem
                            ).name
                          }`
                        };
                      }
                    )}
                    inputOnChangeHandler={this.editorSelectOnChangeHandler}
                    errors={errors.additionalStaff}
                    optList={this.props.staff.staffList.map(staffItem => {
                      return {
                        label: `${staffItem.staffId} - ${staffItem.name}`,
                        value: staffItem.staffId
                      };
                    })}
                  />
                  <div>{courseItem.courseCode}</div>
                </FormRow>
              );
            })}
          </div>
        </div>
      );
    } else {
      editor = null;
    }

    if (this.state.isLoading)
      return (
        <Fragment>
          <FullPageSpinner loadingPrimary={true} />
        </Fragment>
      );
    else {
      return (
        <Fragment>
          <Prompt
            when={!this.state.isSaved}
            message={'You have unsaved changes. Do you want to navigate away?'}
          />
          <form onSubmit={this.formSubmitHandler}>
            <SelectBox
              name="classCode"
              label="Class"
              bigLabel={true}
              value={this.state.classCode}
              inputOnChangeHandler={this.inputOnChangeHandler}
              errors={errors.classCode}
              containerStyles={styles.marginBottom20}
              optList={this.props.classes.classList.map((item, index) => {
                return {
                  label: `${item.classCode} - ${item.nameOfClass}`,
                  value: item.classCode
                };
              })}
            />
            {this.state.classCode !== '' ? (
              <Fragment>
                {this.state.showEditor ? editor : null}
                <Table
                  striped={true}
                  containerStyles={styles.marginBottom20}
                  thead={thead}
                  tbody={tbody}
                  clickedDay={this.state.clickedDay}
                  clickedHour={this.state.clickedHour}
                  clickedRow={this.state.clickedRow}
                  clickedCol={this.state.clickedCol}
                  tableCellClickHandler={this.tableCellClickHandler}
                />
                <ButtonSubmit
                  className={styles.marginBottom20}
                  isLoading={this.state.isSubmitting}>
                  Update Timetable
                </ButtonSubmit>
              </Fragment>
            ) : null}
          </form>
        </Fragment>
      );
    }
  };
}

export default Timetable;
