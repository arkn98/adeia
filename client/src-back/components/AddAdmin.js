import React, { Component } from 'react';
import mainStyles from './Main.module.css';
import styles from './LeaveApplication.module.css';
import loginStyles from './Login.module.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { updateCurrentRouteTitle } from '../actions/utilActions';
import classNames from 'classnames/bind';
import Spinner from './common/Spinner';

const cx = classNames.bind({ ...mainStyles, ...styles, ...loginStyles });

class AddAdmin extends Component {
  state = {
    isSubmitting: false,
    selectedRadio: 0,
    staffId: '',
    accountType: '',
    name: '',
    email: '',
    password: '',
    password2: '',
    designation: '',
    category: 'Regular Teaching Staff',
    errors: {}
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle('Add Privileged Account');
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

  radioClickHandler = event => {
    let opt = event.target.getAttribute('radio-key');
    if (this.state.selectedRadio !== opt && opt != null) {
      this.setState({ ...this.state, selectedRadio: opt, accountType: opt });
    }
  };

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();

    let staffType = '';
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
    else staffType = null;

    const newUser = {
      accountType: this.state.selectedRadio,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      staffId: this.state.staffId,
      name: this.state.name,
      designation: this.state.designation,
      category: this.state.category,
      staffType
    };

    const newProfile = {
      staffId: this.state.staffId,
      prevLogins: {},
      cplCredits: 0,
      leaveAllotted: {}
    };

    this.props.registerUser(newUser, newProfile, this.props.history);
  };

  render() {
    const errors = this.state.errors;
    if (this.state.category === 'Select a category')
      errors.category = 'Category cannot be empty';

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
                  <h4 className={styles.formTitle}>Add Privileged Account</h4>
                  <div className={styles.formSubtitle}>
                    Add Office/Admin accounts from here.
                  </div>
                </div>
              </div>
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
                      errorLabel: errors.accountType
                    })}
                    /* className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`} */
                  >
                    Account Type
                    {errors.accountType ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.accountType}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <div className={styles.radioGroup}>
                      <div
                        key={0}
                        className={cx({
                          radioItem: true,
                          radioItemSelected: !(this.state.selectedRadio ^ 0)
                        })}
                        onClick={this.radioClickHandler}
                        radio-key={0}>
                        <label className={styles.checkBoxWrapper} radio-key={0}>
                          <input
                            radio-key={0}
                            className={styles.formInput}
                            type="checkbox"
                          />
                          <div
                            radio-key={0}
                            className={cx({
                              checkBoxCheckmarkOutline: true,
                              checked: !(this.state.selectedRadio ^ 0)
                            })}>
                            <svg
                              className={styles.checkboxCheckmark}
                              name="Checkmark"
                              radio-key={0}
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              xmlns="http://www.w3.org/2000/svg">
                              <g fill="none" radio-key={0} fillRule="evenodd">
                                <polyline
                                  radio-key={0}
                                  stroke="#7289da"
                                  strokeWidth="2"
                                  points="3.5 9.5 7 13 15 5"
                                />
                              </g>
                            </svg>
                          </div>
                        </label>
                        <div radio-key={0} className={styles.radioContent}>
                          <div radio-key={0} className={styles.title}>
                            Admin
                          </div>
                        </div>
                      </div>
                      <div
                        key={1}
                        className={cx({
                          radioItem: true,
                          radioItemSelected: !(this.state.selectedRadio ^ 1)
                        })}
                        onClick={this.radioClickHandler}
                        radio-key={1}>
                        <label className={styles.checkBoxWrapper} radio-key={1}>
                          <input
                            radio-key={1}
                            className={styles.formInput}
                            type="checkbox"
                          />
                          <div
                            radio-key={1}
                            className={cx({
                              checkBoxCheckmarkOutline: true,
                              checked: !(this.state.selectedRadio ^ 1)
                            })}>
                            <svg
                              className={styles.checkboxCheckmark}
                              name="Checkmark"
                              radio-key={1}
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              xmlns="http://www.w3.org/2000/svg">
                              <g fill="none" radio-key={1} fillRule="evenodd">
                                <polyline
                                  radio-key={1}
                                  stroke="#7289da"
                                  strokeWidth="2"
                                  points="3.5 9.5 7 13 15 5"
                                />
                              </g>
                            </svg>
                          </div>
                        </label>
                        <div radio-key={1} className={styles.radioContent}>
                          <div radio-key={1} className={styles.title}>
                            Office
                          </div>
                        </div>
                      </div>
                      <div
                        key={3}
                        className={cx({
                          radioItem: true,
                          radioItemSelected: !(this.state.selectedRadio ^ 3)
                        })}
                        onClick={this.radioClickHandler}
                        radio-key={3}>
                        <label className={styles.checkBoxWrapper} radio-key={3}>
                          <input
                            radio-key={3}
                            className={styles.formInput}
                            type="checkbox"
                          />
                          <div
                            radio-key={3}
                            className={cx({
                              checkBoxCheckmarkOutline: true,
                              checked: !(this.state.selectedRadio ^ 3)
                            })}>
                            <svg
                              className={styles.checkboxCheckmark}
                              name="Checkmark"
                              radio-key={3}
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              xmlns="http://www.w3.org/2000/svg">
                              <g fill="none" radio-key={3} fillRule="evenodd">
                                <polyline
                                  radio-key={3}
                                  stroke="#7289da"
                                  strokeWidth="2"
                                  points="3.5 9.5 7 13 15 5"
                                />
                              </g>
                            </svg>
                          </div>
                        </label>
                        <div radio-key={3} className={styles.radioContent}>
                          <div radio-key={3} className={styles.title}>
                            Developer
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`${mainStyles.marginBottom20} ${
                    styles.formItemWrapper
                  }`}>
                  <h5
                    className={cx({
                      formFieldLabel: true,
                      marginBottom8: true,
                      errorLabel: errors.staffId
                    })}
                    /* className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`} */
                  >
                    Staff ID
                    {errors.staffId ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.staffId}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <input
                      onChange={this.inputOnChangeHandler}
                      name="staffId"
                      value={this.state.staffId}
                      className={cx({
                        formInput: true,
                        formInputError: errors.staffId
                      })}
                      type="text"
                    />
                  </div>
                </div>
                <div
                  className={`${mainStyles.marginBottom20} ${
                    styles.formItemWrapper
                  }`}>
                  <h5
                    className={cx({
                      formFieldLabel: true,
                      marginBottom8: true,
                      errorLabel: errors.email
                    })}
                    /* className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`} */
                  >
                    Email
                    {errors.email ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.email}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <input
                      onChange={this.inputOnChangeHandler}
                      name="email"
                      value={this.state.email}
                      className={cx({
                        formInput: true,
                        formInputError: errors.email
                      })}
                      type="text"
                    />
                  </div>
                </div>
                <div
                  className={`${mainStyles.marginBottom20} ${
                    styles.formItemWrapper
                  }`}>
                  <h5
                    className={cx({
                      formFieldLabel: true,
                      marginBottom8: true,
                      errorLabel: errors.name
                    })}
                    /* className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`} */
                  >
                    Name
                    {errors.name ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.name}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <input
                      onChange={this.inputOnChangeHandler}
                      name="name"
                      value={this.state.name}
                      className={cx({
                        formInput: true,
                        formInputError: errors.name
                      })}
                      type="text"
                    />
                  </div>
                </div>
                <div
                  className={`${mainStyles.marginBottom20} ${
                    styles.formItemWrapper
                  }`}>
                  <h5
                    className={cx({
                      formFieldLabel: true,
                      marginBottom8: true,
                      errorLabel: errors.designation
                    })}>
                    Designation
                    {errors.designation ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.designation}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <input
                      onChange={this.inputOnChangeHandler}
                      name="designation"
                      value={this.state.designation}
                      className={cx({
                        formInput: true,
                        formInputError: errors.designation
                      })}
                      type="text"
                    />
                  </div>
                </div>
                <div
                  className={`${mainStyles.marginBottom20} ${
                    styles.formItemWrapper
                  }`}>
                  <h5
                    className={cx({
                      formFieldLabel: true,
                      marginBottom8: true,
                      errorLabel: errors.password
                    })}>
                    Password
                    {errors.password ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.password}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <input
                      name="password"
                      onChange={this.inputOnChangeHandler}
                      type="password"
                      value={this.state.password}
                      className={cx({
                        formInput: true,
                        formInputError: errors.password
                      })}
                    />
                  </div>
                </div>
                <div
                  className={`${mainStyles.marginBottom20} ${
                    styles.formItemWrapper
                  }`}>
                  <h5
                    className={cx({
                      formFieldLabel: true,
                      marginBottom8: true,
                      errorLabel: errors.password2
                    })}>
                    Re-enter Password
                    {errors.password2 ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.password2}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <input
                      name="password2"
                      onChange={this.inputOnChangeHandler}
                      type="password"
                      value={this.state.password2}
                      className={cx({
                        formInput: true,
                        formInputError: errors.password2
                      })}
                    />
                  </div>
                </div>
                <div
                  className={`${mainStyles.marginBottom20} ${
                    styles.formItemWrapper
                  }`}>
                  <h5
                    className={cx({
                      formFieldLabel: true,
                      marginBottom8: true,
                      errorLabel: errors.category
                    })}>
                    Category
                    {errors.category ? (
                      <span className={loginStyles.errorMessage}>
                        {' '}
                        - {errors.category}
                      </span>
                    ) : null}
                  </h5>
                  <div className={styles.inputWrapper}>
                    <select
                      onChange={this.inputOnChangeHandler}
                      name="category"
                      value={this.state.category}
                      className={cx({
                        formInput: true,
                        formSelect: true,
                        formInputError: errors.category
                      })}
                      type="text">
                      <option disabled>Select a category</option>
                      <option>Regular Teaching Staff</option>
                      <option>Regular Non-Teaching Staff</option>
                      <option>Teaching Fellows</option>
                      <option>Non-Teaching - No Leave</option>
                      <option>Research Scholars - 30</option>
                      <option>Research Scholars - 20</option>
                      <option>Research Scholars - Others</option>
                      <option>Others</option>
                    </select>
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
                      type="submit"
                      className={
                        this.state.isSubmitting
                          ? `${loginStyles.submitButton} ${
                              loginStyles.submitting
                            }`
                          : `${loginStyles.submitButton}`
                      }>
                      {this.state.isSubmitting ? (
                        <Spinner isDarkTheme={isDarkTheme} isInButton={true} />
                      ) : (
                        <div className={loginStyles.contents}>Add Account</div>
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

AddAdmin.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, updateCurrentRouteTitle }
)(withRouter(AddAdmin));
