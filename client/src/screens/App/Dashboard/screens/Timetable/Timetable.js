import React, { Component, Fragment } from 'react';
import { Prompt } from 'react-router-dom';
import styles from './Timetable.module.scss';
import {
  SelectBox,
  LabelWithRightChildren,
  FormRow,
  SelectSearch,
  Form,
  FileUpload,
  Divider,
  Description
} from 'screens/App/shared/common/FormInput';
import { MdTrash, MdClose } from 'assets/icons';
import { Slot } from 'screens/App/shared/common/Slot';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import { FullPageSpinner } from 'screens/App/shared/common/Spinner';
import { Table } from 'screens/App/shared/common/Table';

class Timetable extends Component {
  state = {
    isSubmitting: false,
    errors: {},
    classCode: '',
    timetableCSV: null,
    isTableLoaded: false,
    isSaved: true,
    isEntryVisible: false,
    isEditEntry: false,
    entryContent: {
      start: '',
      clickedCol: '',
      clickedRow: '',
      duration: '1',
      title: '',
      day: '',
      entry: [
        {
          courseCode: '',
          handlingStaff: '',
          additionalStaff: []
        }
      ]
    },
    timetable: [],
    nameOfClass: ''
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

  formSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();
    let newTimetable = this.state.timetable.map((day, dayIndex) => {
      return day.map((hour, hourIndex) => {
        let newHour = { ...hour };
        newHour.course = hour.course.map((courseObj, courseIndex) => {
          let newCourse = { ...courseObj };
          newCourse.courseCode = this.props.courses.courseList.find(
            x => x.courseCode === courseObj.courseCode
          )._id;
          newCourse.handlingStaff = this.props.staff.staffList.find(
            x => x.staffId === courseObj.handlingStaff
          )._id;
          if (Array.isArray(courseObj.additionalStaff)) {
            newCourse.additionalStaff = courseObj.additionalStaff
              .filter(x => x !== '')
              .map(
                addtlstaff =>
                  this.props.staff.staffList.find(x => x.staffId === addtlstaff)
                    ._id
              );
          } else if (typeof courseObj.additionalStaff === 'string') {
            newCourse.additionalStaff.push(
              this.props.staff.staffList.find(
                x => x.staffId === courseObj.additionalStaff
              )._id
            );
          }
          return newCourse;
        });
        return newHour;
      });
    });
    let tempClass = this.props.classes.classList.find(
      x => x.classCode === this.state.classCode
    );
    let temp = {
      timetable: newTimetable,
      classId: tempClass._id,
      classGroupId: tempClass.classGroup._id
    };
    this.props
      .addUpdateTimetable(temp)
      .then(res => {
        this.setState(
          { ...this.state, isSubmitting: false, isSaved: true },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action Successful',
              message:
                'Timetable for class <span style="font-weight: 600;">' +
                this.state.classCode +
                '</span> has been updated successfully.',
              buttonPrimary: true,
              buttonContent: 'Okay'
            });
          }
        );
      })
      .catch(err => {
        this.setState(
          { ...this.state, isSubmitting: false, isSaved: false },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Error',
              message: 'Something went wrong. Please try again later.',
              buttonPrimary: false,
              buttonDanger: true,
              buttonContent: 'Okay'
            });
          }
        );
      });
  };

  entryOnChangeHandler = (event, index) => {
    let arr = this.state.entryContent.entry.slice(0);
    arr[index][event.target.name] = event.target.value;
    this.setState({
      ...this.state,
      isSaved: false,
      entryContent: {
        ...this.state.entryContent,
        entry: arr
      }
    });
  };

  entryCloseHandler = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      isEntryVisible: false,
      isEditEntry: false,
      entryContent: { entry: [] }
    });
  };

  entryDeleteHandler = event => {
    event.preventDefault();
    if (
      !window.confirm(
        'Do you want to delete this entry? This cannot be undone.'
      )
    ) {
      return;
    }
    if (this.state.isEditEntry) {
      let newTimetable = this.state.timetable.slice(0);
      let toRemoveIndex = this.state.timetable[
        parseInt(this.state.entryContent.day)
      ].findIndex(x => x.start === parseInt(this.state.entryContent.start));
      newTimetable[parseInt(this.state.entryContent.day)].splice(
        toRemoveIndex,
        1
      );
      this.setState({
        ...this.state,
        timetable: newTimetable,
        isSaved: false,
        isEntryVisible: false,
        isEditEntry: false,
        entryContent: { entry: [] }
      });
    } else {
      this.setState({
        ...this.state,
        isSaved: false,
        isEntryVisible: false,
        isEditEntry: false,
        entryContent: { entry: [] }
      });
    }
  };

  entryRemoveHandler = (event, index) => {
    event.preventDefault();
    if (!window.confirm('Are you sure you want to remove the entry?')) {
      return;
    }
    let newEntry = this.state.entryContent.entry.splice(0);
    newEntry.splice(index, 1);
    this.setState({
      ...this.state,
      isSaved: false,
      entryContent: { ...this.state.entryContent, entry: newEntry }
    });
  };

  entrySelectOnChangeHandler = (value, index, name) => {
    let arr = this.state.entryContent.entry.slice(0);
    arr[index][name] = value.value;
    this.setState({
      ...this.state,
      isSaved: false,
      entryContent: {
        ...this.state.entryContent,
        entry: arr
      }
    });
  };

  entryMultiSelectOnChangeHandler = (value, index, name) => {
    let arr = this.state.entryContent.entry.slice(0);
    let newValue = value;
    arr[index][name] = newValue.map(x => x.value);
    this.setState({
      ...this.state,
      isSaved: false,
      entryContent: { ...this.state.entryContent, entry: arr }
    });
  };

  entryStartDurationHandler = event => {
    this.setState({
      ...this.state,
      isSaved: false,
      entryContent: {
        ...this.state.entryContent,
        [event.target.name]: event.target.value
      }
    });
  };

  inputOnChangeHandler = event => {
    if (!this.state.isSaved) {
      if (
        !window.confirm('You have unsaved changes. Do you want to continue?')
      ) {
        return;
      }
    }
    if (event.target.name === 'classCode') {
      if (event.target.value !== this.state.classCode) {
        let classId = this.props.classes.classList.find(
          x => x.classCode === event.target.value
        )._id;
        this.props
          .getTimetable(classId)
          .then(result => {
            this.setState({
              ...this.state,
              timetable: Array.isArray(this.props.timetable.timetable)
                ? this.props.timetable.timetable
                : [],
              isTableLoaded: true,
              isSaved: true,
              isEntryVisible: false,
              entryContent: { entry: [] }
            });
          })
          .catch(err => {
            this.setState({
              ...this.state,
              isTableLoaded: true
            });
          });
      }
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addNewEntry = event => {
    this.setState({
      ...this.state,
      isEntryVisible: true,
      isEditEntry: false,
      entryContent: {
        title: `Add new entry - ${this.days[event.target.getAttribute('day')]}`,
        day: event.target.getAttribute('day'),
        start: parseInt(event.target.getAttribute('hour')),
        duration: 1,
        clickedRow: parseInt(event.target.getAttribute('row')),
        clickedCol: parseInt(event.target.getAttribute('col')),
        entry: [
          {
            courseCode: '',
            handlingStaff: '',
            additionalStaff: []
          }
        ]
      }
    });
  };

  editExistingEntry = event => {
    let row = parseInt(event.target.getAttribute('day'));
    let col = parseInt(event.target.getAttribute('hour'));
    let start = this.state.timetable[row].find(x => x.start === col).start;
    let duration = this.state.timetable[row].find(
      x => x.start === parseInt(col)
    ).duration;
    let courseCode = [];
    this.state.timetable[row]
      .find(x => x.start === parseInt(col))
      .course.map(course => courseCode.push(course.courseCode));
    let handlingStaff = [];
    this.state.timetable[row]
      .find(x => x.start === parseInt(col))
      .course.map(staff => handlingStaff.push(staff.handlingStaff));
    let additionalStaff = [];
    this.state.timetable[row]
      .find(x => x.start === parseInt(col))
      .course.map(addlstaff => additionalStaff.push(addlstaff.additionalStaff));

    let newEntry = [];
    courseCode.forEach((course, index) => {
      let obj = {};
      obj.courseCode = course;
      obj.handlingStaff = handlingStaff[index];
      obj.additionalStaff = additionalStaff[index];
      newEntry.push(obj);
    });

    this.setState({
      ...this.state,
      isEntryVisible: true,
      isEditEntry: true,
      isSaved: false,
      entryContent: {
        title: `Edit entry - ${this.days[row]}`,
        clickedCol: col,
        clickedRow: row,
        day: event.target.getAttribute('day'),
        start,
        duration,
        entry: newEntry
      }
    });
  };

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  newEntrySubmitHandler = event => {
    event.preventDefault();
    const newTimetable = this.state.timetable.slice(0);
    let newDay = newTimetable[this.state.entryContent.day].slice(0);

    let course = [];
    this.state.entryContent.entry.forEach((entry, index) => {
      let obj = {};
      obj.courseCode = entry.courseCode;
      obj.handlingStaff = entry.handlingStaff;
      obj.additionalStaff = entry.additionalStaff;
      course.push(obj);
    });

    let newHour = {
      start: parseInt(this.state.entryContent.start),
      duration:
        parseInt(this.state.entryContent.start) +
          parseInt(this.state.entryContent.duration) >
        8
          ? parseInt(this.state.entryContent.duration) -
            (parseInt(this.state.entryContent.start) +
              parseInt(this.state.entryContent.duration) -
              8) +
            1
          : parseInt(this.state.entryContent.duration),
      course
    };

    if (this.state.isEditEntry) {
      let mainIndexToRemove = -1;
      newDay.forEach((item, index) => {
        if (item.start === parseInt(this.state.entryContent.clickedCol)) {
          mainIndexToRemove = index;
        }
      });
      newDay.splice(mainIndexToRemove, 1);

      let hourStart = parseInt(this.state.entryContent.start);
      let hourEnd =
        parseInt(this.state.entryContent.start) +
        parseInt(this.state.entryContent.duration);
      let toRemoveIndexes = [];
      let leftOverlap = -1;
      let rightOverlap = -1;
      newDay.forEach((hour, index) => {
        let tempStart = hour.start;
        let tempEnd = hour.start + hour.duration;
        if (tempStart >= hourStart && tempEnd <= hourEnd) {
          toRemoveIndexes.push(index);
        } else if (hourEnd > tempStart && hourEnd < tempEnd) {
          leftOverlap = index;
        } else if (hourStart >= tempStart && hourStart < tempEnd) {
          rightOverlap = index;
        }
      });

      if (leftOverlap !== -1) {
        newDay[leftOverlap].duration =
          newDay[leftOverlap].duration - (hourEnd - newDay[leftOverlap].start);
        newDay[leftOverlap].start = hourEnd > 8 ? 8 : hourEnd;
      }

      if (rightOverlap !== -1) {
        newDay[rightOverlap].duration =
          newDay[rightOverlap].duration -
          (newDay[rightOverlap].start +
            newDay[rightOverlap].duration -
            hourStart);
      }

      if (toRemoveIndexes.length !== 0) {
        if (
          !window.confirm(
            'Your entry is overlapping with existing entries. Do you wish to proceed?'
          )
        ) {
          return;
        }
        for (let i = toRemoveIndexes.length - 1; i >= 0; i--)
          newDay.splice(toRemoveIndexes[i], 1);
      }

      newDay.splice(newDay.length - 1, 0, newHour);
      newDay.sort((a, b) => a.start - b.start);
      newTimetable[this.state.entryContent.day] = newDay;
      this.setState({
        ...this.state,
        isSaved: false,
        timetable: newTimetable,
        isEntryVisible: false,
        isEditEntry: false,
        entryContent: { entry: [] }
      });
    } else {
      let hourStart = parseInt(this.state.entryContent.start);
      let hourEnd =
        parseInt(this.state.entryContent.start) +
        parseInt(this.state.entryContent.duration);
      let toRemoveIndexes = [];
      let leftOverlap = -1;
      let rightOverlap = -1;
      newDay.forEach((hour, index) => {
        let tempStart = hour.start;
        let tempEnd = hour.start + hour.duration;
        if (tempStart >= hourStart && tempEnd <= hourEnd) {
          toRemoveIndexes.push(index);
        } else if (hourEnd > tempStart && hourEnd < tempEnd) {
          leftOverlap = index;
        } else if (hourStart >= tempStart && hourStart < tempEnd) {
          rightOverlap = index;
        }
      });

      if (leftOverlap !== -1) {
        newDay[leftOverlap].duration =
          newDay[leftOverlap].duration - (hourEnd - newDay[leftOverlap].start);
        newDay[leftOverlap].start = hourEnd > 8 ? 8 : hourEnd;
      }

      if (rightOverlap !== -1) {
        newDay[rightOverlap].duration =
          newDay[rightOverlap].duration -
          (newDay[rightOverlap].start +
            newDay[rightOverlap].duration -
            hourStart);
      }

      if (toRemoveIndexes.length !== 0) {
        if (
          !window.confirm(
            'Your entry is overlapping with existing entries. Do you wish to proceed?'
          )
        ) {
          return;
        }
        for (let i = toRemoveIndexes.length - 1; i >= 0; i--)
          newDay.splice(toRemoveIndexes[i], 1);
      }
      newDay.splice(newDay.length - 1, 0, newHour);
      newDay.sort((a, b) => a.start - b.start);
      newTimetable[this.state.entryContent.day] = newDay;
      this.setState({
        ...this.state,
        timetable: newTimetable,
        isSaved: false,
        isEntryVisible: false,
        isEditEntry: false,
        entryContent: { entry: [] }
      });
    }
  };

  sendFile = event => {
    event.preventDefault();
    if (
      !window.confirm(
        'Warning! This will clear all of the current content in the timetable. But changes will be updated only after you click the update button.'
      )
    ) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.state.timetableCSV);
    this.props
      .uploadTimetable(formData)
      .then(res => {
        this.setState(
          {
            ...this.state,
            timetable: res,
            isTableLoaded: true,
            isSaved: true,
            isEntryVisible: false,
            entryContent: { entry: [] }
          },
          () => {
            this.props.showPopout({
              type: 'modalSingleButton',
              title: 'Action Successful',
              message: 'Data loaded successfully.',
              buttonPrimary: true,
              buttonContent: 'Okay'
            });
          }
        );
      })
      .catch(err => console.log(err));
  };

  fileOnChangeHandler = event => {
    this.setState({ timetableCSV: event.target.files[0] });
  };

  addAdditionalCourseClickHandler = event => {
    event.preventDefault();
    let arr = this.state.entryContent.entry.slice(0);
    arr.push({ courseCode: '', handlingStaff: '', additionalStaff: [] });
    this.setState({
      ...this.state,
      entryContent: { ...this.state.entryContent, entry: arr }
    });
  };

  render() {
    const { errors, isTableLoaded } = this.state;

    let slots = [];
    this.state.timetable.forEach((row, index) => {
      let hours = [];
      hours.push(<td style={{ textAlign: 'left' }}>{this.days[index]}</td>);
      let tempIndex = 1;
      row.forEach((hour, index2) => {
        if (hour.start !== tempIndex) {
          while (hour.start - tempIndex > 0) {
            hours.push(
              <td
                key={tempIndex}
                onClick={this.addNewEntry}
                day={index}
                row={index}
                col={tempIndex}
                hour={tempIndex}
                className={`${styles.hoverable} ${
                  this.state.entryContent.clickedRow === index &&
                  this.state.entryContent.clickedCol === tempIndex
                    ? styles.focused
                    : null
                }`}
              />
            );
            tempIndex++;
          }
        }
        hours.push(
          <td
            onClick={this.editExistingEntry}
            day={index}
            row={index}
            col={tempIndex}
            hour={tempIndex}
            key={tempIndex}
            className={`${styles.hoverable} ${
              this.state.entryContent.clickedRow === index &&
              this.state.entryContent.clickedCol === tempIndex
                ? styles.focused
                : null
            }`}
            colSpan={
              hour.start + hour.duration - tempIndex === 0
                ? 1
                : hour.start + hour.duration - tempIndex
            }>
            <Slot day={index} hour={tempIndex}>
              {hour.course.map(courseItem => {
                return {
                  nameOfCourse: this.props.courses.courseList.find(
                    x => x.courseCode === courseItem.courseCode
                  ).nameOfCourse,
                  handlingStaff: this.props.staff.staffList.find(
                    x => x.staffId === courseItem.handlingStaff
                  ).name,
                  additionalStaff: Array.isArray(courseItem.additionalStaff)
                    ? courseItem.additionalStaff
                        .filter(x => x !== '')
                        .map(x => {
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
          </td>
        );
        tempIndex +=
          hour.start + hour.duration - tempIndex === 0
            ? 1
            : hour.start + hour.duration - tempIndex;
      });
      while (tempIndex < 9) {
        hours.push(
          <td
            key={tempIndex}
            hour={tempIndex}
            row={index}
            col={tempIndex}
            day={index}
            onClick={this.addNewEntry}
            className={`${styles.hoverable} ${
              this.state.entryContent.clickedRow === index &&
              this.state.entryContent.clickedCol === tempIndex
                ? styles.focused
                : null
            }`}
          />
        );
        tempIndex++;
      }
      slots.push(<tr>{hours}</tr>);
    });

    let thead = ['Day', 1, 2, 3, 4, 5, 6, 7, 8];

    if (this.state.isLoading) return <FullPageSpinner loadingPrimary={true} />;
    else
      return (
        <Fragment>
          <Prompt
            when={!this.state.isSaved}
            message={'You have unsaved changes. Do you want to navigate away?'}
          />
          <Form
            fullWidth={true}
            onSubmit={this.formSubmitHandler}
            showBottomSpace={true}>
            <SelectBox
              name="classCode"
              label="Class"
              bigLabel={false}
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
            {!isTableLoaded ? null : (
              <Fragment>
                <Description>
                  Upload CSV/Excel sheet to load data (loaded data won't be
                  saved to the database unless you click Update timetable at the
                  bottom)
                </Description>
                <FormRow containerStyles={styles.marginBottom8}>
                  <FileUpload
                    name="timetableCSV"
                    bigLabel={true}
                    inputOnChangeHandler={this.fileOnChangeHandler}
                  />
                  <div style={{ flex: '0 1 0' }}>
                    <ButtonSubmit
                      sizeSmall={true}
                      containerStyles={styles.noMarginBottom}
                      onClick={this.sendFile}>
                      Load data
                    </ButtonSubmit>
                  </div>
                </FormRow>
                <Divider />
              </Fragment>
            )}
            {this.state.isEntryVisible ? (
              <Fragment>
                <div
                  className={`${styles.inlineEditorWrapper} ${
                    styles.marginBottom20
                  }`}>
                  <LabelWithRightChildren
                    label={this.state.entryContent.title}
                    bigLabel={true}
                    containerStyles={styles.marginBottom8}>
                    <div
                      className={`${styles.iconHoverWrapper} ${styles.danger}`}
                      style={{ marginRight: '6px' }}
                      onClick={this.entryDeleteHandler}>
                      <MdTrash className={styles.customIconTest} />
                    </div>
                    <div
                      onClick={this.entryCloseHandler}
                      className={styles.iconHoverWrapper}>
                      <MdClose className={styles.customIconTest} />
                    </div>
                  </LabelWithRightChildren>
                  <FormRow containerStyles={styles.marginBottom8}>
                    <SelectBox
                      name="start"
                      label="Hour"
                      bigLabel={true}
                      value={this.state.entryContent.start}
                      inputOnChangeHandler={this.entryStartDurationHandler}
                      errors={errors.start}
                      optList={[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                        return {
                          label: item,
                          value: item
                        };
                      })}
                    />
                    <SelectBox
                      name="duration"
                      label="Duration"
                      bigLabel={true}
                      value={this.state.entryContent.duration}
                      inputOnChangeHandler={this.entryStartDurationHandler}
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
                    {this.state.entryContent.entry.map((entry, index) => {
                      return (
                        <FormRow containerStyles={styles.marginBottom8}>
                          <div
                            className={`${styles.mobileVisible} ${
                              styles.editorInnerRowTitle
                            }`}>
                            <div>
                              <h5 className={styles.formFieldLabel}>
                                {index + 1}
                              </h5>
                            </div>
                            <div
                              className={`${styles.iconHoverWrapper} ${
                                styles.danger
                              }`}
                              onClick={e => this.entryRemoveHandler(e, index)}>
                              <MdTrash className={styles.customIconTest} />
                            </div>
                          </div>
                          <SelectSearch
                            name="courseCode"
                            label="Course"
                            bigLabel={true}
                            isDarkTheme={this.props.utils.isDarkTheme}
                            index={index}
                            propStyles={{ flex: '0 1 auto', marginLeft: '0' }}
                            value={{
                              value: this.state.entryContent.entry[index]
                                .courseCode,
                              label: `${
                                this.state.entryContent.entry[index].courseCode
                              }${
                                this.state.entryContent.entry[index]
                                  .courseCode !== ''
                                  ? ` - ${
                                      this.props.courses.courseList.find(
                                        x =>
                                          x.courseCode ===
                                          this.state.entryContent.entry[index]
                                            .courseCode
                                      ).nameOfCourse
                                    }`
                                  : ''
                              }`
                            }}
                            inputOnChangeHandler={
                              this.entrySelectOnChangeHandler
                            }
                            errors={errors.courseCode}
                            optList={this.props.courses.courseList.map(item => {
                              return {
                                label: `${item.courseCode} - ${
                                  item.nameOfCourse
                                }`,
                                value: item.courseCode
                              };
                            })}
                            isLoading={this.props.courses.loading}
                            isSearchable={true}
                          />
                          <SelectSearch
                            name="handlingStaff"
                            label="Staff"
                            bigLabel={true}
                            propStyles={{ flex: '0 1 auto' }}
                            isDarkTheme={this.props.utils.isDarkTheme}
                            index={index}
                            value={{
                              value: this.state.entryContent.entry[index]
                                .handlingStaff,
                              label: `${
                                this.state.entryContent.entry[index]
                                  .handlingStaff
                              }${
                                this.state.entryContent.entry[index]
                                  .handlingStaff !== ''
                                  ? ` - ${
                                      this.props.staff.staffList.find(
                                        x =>
                                          x.staffId ===
                                          this.state.entryContent.entry[index]
                                            .handlingStaff
                                      ).name
                                    }`
                                  : ''
                              }`
                            }}
                            inputOnChangeHandler={
                              this.entrySelectOnChangeHandler
                            }
                            errors={errors.courseCode}
                            optList={this.props.staff.staffList.map(item => {
                              return {
                                label: `${item.staffId} - ${item.name}`,
                                value: item.staffId
                              };
                            })}
                            isLoading={this.props.staff.loading}
                            isSearchable={true}
                          />
                          <SelectSearch
                            name="additionalStaff"
                            label="Additional Staff"
                            propStyles={{ flex: '0 1 auto' }}
                            bigLabel={true}
                            isMultiSelect={true}
                            isDarkTheme={this.props.utils.isDarkTheme}
                            index={index}
                            value={this.state.entryContent.entry[
                              index
                            ].additionalStaff
                              .filter(x => x !== '')
                              .map(addtlstaff => {
                                return {
                                  value: addtlstaff,
                                  label: `${addtlstaff} - ${
                                    this.props.staff.staffList.find(
                                      x => x.staffId === addtlstaff
                                    ).name
                                  }`
                                };
                              })}
                            inputOnChangeHandler={
                              this.entryMultiSelectOnChangeHandler
                            }
                            errors={errors.courseCode}
                            optList={this.props.staff.staffList.map(item => {
                              return {
                                label: `${item.staffId} - ${item.name}`,
                                value: item.staffId
                              };
                            })}
                            isLoading={this.props.staff.loading}
                            isSearchable={true}
                          />
                          <div
                            style={{
                              flex: '0 0 0',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              position: 'relative',
                              bottom: '6px'
                            }}>
                            <div
                              className={`${styles.iconHoverWrapper} ${
                                styles.danger
                              } ${styles.mobileInvisible}`}
                              onClick={e => this.entryRemoveHandler(e, index)}>
                              <MdTrash className={styles.customIconTest} />
                            </div>
                          </div>
                          <div
                            style={{
                              flex: '0 1 auto',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              position: 'relative',
                              bottom: '6px'
                            }}>
                            {this.state.entryContent.entry.length ===
                            index + 1 ? (
                              <ButtonSubmit
                                sizeSmall={true}
                                containerStyles={styles.noMarginBottom}
                                onClick={this.newEntrySubmitHandler}
                                style={{ width: '100%' }}>
                                {this.state.isEditEntry ? `Update` : `Add`}
                              </ButtonSubmit>
                            ) : (
                              ' '
                            )}
                          </div>
                        </FormRow>
                      );
                    })}
                    <FormRow>
                      <span
                        className={styles.smallLinkButton}
                        onClick={this.addAdditionalCourseClickHandler}>
                        Add a course to same slot?
                      </span>
                      <span className={styles.infoBox}>
                        Changes won't save unless you click update
                      </span>
                    </FormRow>
                  </div>
                </div>
              </Fragment>
            ) : null}
            {!isTableLoaded ? null : (
              <Fragment>
                <Description>
                  or click on the cells to add/update slots manually (you can
                  also edit slots after loading data from a CSV file; but please
                  remember to click Update timetable at the bottom to save your
                  changes).
                </Description>
                <Table
                  striped={true}
                  containerStyles={styles.marginBottom20}
                  thead={thead}
                  clickedDay={this.state.entryContent.day}
                  clickedCol={this.state.entryContent.clickedCol}
                  clickedRow={this.state.entryContent.clickedRow}
                  clickedHour={this.state.entryContent.start}>
                  {slots}
                </Table>
                <div className={styles.marginBottom20}>
                  <ButtonSubmit
                    sizeSmall={true}
                    isLoading={this.state.isSubmitting}>
                    Update Timetable
                  </ButtonSubmit>
                </div>
              </Fragment>
            )}
          </Form>
        </Fragment>
      );
  }
}

Timetable.defaultProps = {
  classes: {
    classList: [],
    loading: false
  },
  courses: {
    loading: false,
    courseList: []
  },
  staff: {
    loading: false,
    staffList: []
  }
};

export default Timetable;
