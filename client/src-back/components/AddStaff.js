import React, { Component } from 'react';
import mainStyles from './Main.module.css';
import styles from './LeaveApplication.module.css';
import loginStyles from './Login.module.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerStaff } from '../actions/authActions';
import { createProfile } from '../actions/profileActions';
import { updateCurrentRouteTitle } from '../actions/utilActions';
import classNames from 'classnames/bind';
import Spinner from './common/Spinner';

const cx = classNames.bind({ ...mainStyles, ...styles, ...loginStyles });

class AddStaff extends Component {
  state = {
    isSubmitting: false,
    staffId: '',
    name: '',
    designation: '',
    category: 'Regular Teaching Staff',
    errors: {}
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
      staffId: this.state.staffId,
      name: this.state.name,
      designation: this.state.designation,
      category: this.state.category,
      staffType: staffType
    };

    const newProfile = {
      staffId: this.state.staffId,
      prevLogins: {},
      cplCredits: 0,
      leaveAllotted: {}
    };

    this.props.registerStaff(newUser, newProfile, this.props.history);
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
    this.props.updateCurrentRouteTitle('Add Staff');
  };

  render() {
    const { errors } = this.state;

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
            {/* <div className={`${mainStyles.welcomeMessage} ${mainStyles.marginTop20}`}>
                Apply for leaves
              </div> */}
            <div className={`${styles.formWrapper}`}>
              <div className={`${styles.formText} ${styles.formItemWrapper}`}>
                <div
                  style={{
                    flex: '1 1 auto',
                    marginLeft: 0,
                    marginRight: 0,
                    width: '100%'
                  }}>
                  <h4 className={styles.formTitle}>Add Staff</h4>
                  <div className={styles.formSubtitle}>
                    Add Staff accounts from here.
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
                      errorLabel: errors.staffId
                    })}>
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
                      type="text"
                      className={cx({
                        formInput: true,
                        formInputError: errors.staffId
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
                      errorLabel: errors.name
                    })}>
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
                      })}>
                      <option disabled>Select staff category</option>
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
                        <div className={loginStyles.contents}>Add Staff</div>
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

AddStaff.propTypes = {
  auth: PropTypes.object.isRequired,
  registerStaff: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerStaff, createProfile, updateCurrentRouteTitle }
)(withRouter(AddStaff));
