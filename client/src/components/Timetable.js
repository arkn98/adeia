import React, { Component } from 'react';
import mainStyles from './Main.module.css';
import styles from './LeaveApplication.module.css';
import loginStyles from '../Login.module.css';
import tableStyles from './common/tableStyles.module.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCurrentRouteTitle } from '../actions/utilActions';
import Draggable from 'react-draggable';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...mainStyles, ...styles, ...loginStyles });

class Timetable extends Component {
  state = {
    isSubmitting: false,
    errors: {},
    tableCellWidth: 0,
    tableCellHeight: 0
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle('Timetable');
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

    /*  const data = {
      nameOfClass: this.state.nameOfClass,
      classCode: this.state.classCode
    }; */

    //this.props.addClass(data, this.props.history);
  };

  render() {
    const errors = this.state.errors;
    const isDarkTheme = this.props.isDarkTheme;

    return (
      <div
        className={
          isDarkTheme
            ? `${mainStyles.scrollWrapper}`
            : `${mainStyles.scrollWrapper} ${mainStyles.lightTheme} ${
                styles.lightTheme
              }`
        }>
        <div className={mainStyles.contentWrapper}>
          <div className={mainStyles.body}>
            <div className={`${styles.formWrapper}`}>
              <div className={`${styles.formText} ${styles.formItemWrapper}`}>
                <div
                  style={{
                    flex: '1 1 auto',
                    marginLeft: 0,
                    marginRight: 0,
                    width: '100%'
                  }}>
                  <h4 className={styles.formTitle}>Timetable</h4>
                  <div className={styles.formSubtitle}>
                    Change timetables from here.
                  </div>
                </div>
              </div>
              <div
                className={`${mainStyles.marginBottom20} ${
                  styles.formItemWrapper
                }`}>
                <div className={tableStyles.slotContainer}>
                  <Draggable
                    axis="both"
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}>
                    <div
                      className={tableStyles.slot}
                      style={{ zIndex: '9999', cursor: 'move' }}>
                      abcd
                    </div>
                  </Draggable>
                  <div className={tableStyles.slot} />
                  <div className={tableStyles.slot} />
                  <div className={tableStyles.slot} />
                  <div className={tableStyles.slot} />
                  <div className={tableStyles.slot} />
                  <div className={tableStyles.slot} />
                  <div className={tableStyles.slot} />
                  <div className={tableStyles.slot} />
                  <div className={tableStyles.slot} />
                </div>
              </div>
              <Draggable
                axis="both"
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div style={{ zIndex: '9999', cursor: 'move' }}>
                  <div>Drag from here</div>
                  <div>This readme is really dragging on...</div>
                </div>
              </Draggable>
              <form
                onSubmit={this.formSubmitHandler}
                className={styles.formBody}>
                <div
                  className={`${mainStyles.marginBottom20} ${
                    styles.formItemWrapper
                  }`}>
                  <h5
                    className={cx({
                      formFieldLabel: true,
                      marginBottom8: true,
                      errorLabel: errors.nameOfClass
                    })}
                    /* className={`${styles.formFieldLabel} ${
                      mainStyles.marginBottom8
                    }`} */
                  >
                    Class Name
                    {errors.nameOfClass ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.nameOfClass}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <input
                      onChange={this.inputOnChangeHandler}
                      name="nameOfClass"
                      value={this.state.nameOfClass}
                      className={cx({
                        formInput: true,
                        formInputError: errors.nameOfClass
                      })}
                      type="text"
                    />
                  </div>
                </div>
                <div
                  className={
                    isDarkTheme
                      ? `${mainStyles.marginBottom20} ${
                          styles.formItemWrapper
                        } ${tableStyles.timetable}`
                      : `${mainStyles.marginBottom20} ${
                          styles.formItemWrapper
                        } ${tableStyles.timetable} ${tableStyles.lightTheme}`
                  }>
                  <h6 className={tableStyles.title}>Table Title</h6>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left' }}>Day</th>
                        <th>Ⅰ</th>
                        <th>Ⅱ</th>
                        <th>Ⅲ</th>
                        <th>Ⅳ</th>
                        <th>Ⅴ</th>
                        <th>Ⅵ</th>
                        <th>Ⅶ</th>
                        <th>Ⅷ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ textAlign: 'left' }}>Monday</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left' }}>Tuesday</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left' }}>Wednesday</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left' }}>Thursday</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left' }}>Friday</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  className={`${mainStyles.marginBottom20} ${
                    styles.formItemWrapper
                  }`}>
                  <h5
                    className={cx({
                      formFieldLabel: true,
                      marginBottom8: true,
                      errorLabel: errors.classCode
                    })}>
                    Class Code
                    {errors.classCode ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.classCode}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <input
                      onChange={this.inputOnChangeHandler}
                      name="classCode"
                      value={this.state.classCode}
                      className={cx({
                        formInput: true,
                        formInputError: errors.classCode
                      })}
                      type="text"
                    />
                  </div>
                </div>
                <div
                  className={`${mainStyles.marginBottom20} ${
                    styles.formItemWrapper
                  }`}>
                  <div
                    className={`${styles.inputWrapper} ${
                      mainStyles.marginTop8
                    }`}>
                    <button
                      style={{ borderRadius: '5px' }}
                      type="submit"
                      className={loginStyles.login}>
                      {this.state.isSubmitting ? (
                        <span className={loginStyles.spinner}>
                          <span className={loginStyles.spinnerInner}>
                            <span
                              className={`${loginStyles.pulsingEllipsisItem} ${
                                loginStyles.spinnerItem
                              }`}
                            />
                            <span
                              className={`${loginStyles.pulsingEllipsisItem} ${
                                loginStyles.spinnerItem
                              }`}
                            />
                            <span
                              className={`${loginStyles.pulsingEllipsisItem} ${
                                loginStyles.spinnerItem
                              }`}
                            />
                          </span>
                        </span>
                      ) : (
                        <div className={loginStyles.contents}>Add Class</div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Timetable.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle }
)(withRouter(Timetable));
