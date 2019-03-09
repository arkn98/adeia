import React, { Component } from 'react';
import mainStyles from './Main.module.css';
import styles from './LeaveApplication.module.css';
import loginStyles from './Login.module.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addClass } from '../actions/classActions';
import { updateCurrentRouteTitle } from '../actions/utilActions';
import classNames from 'classnames/bind';
import Spinner from './common/Spinner';

const cx = classNames.bind({ ...mainStyles, ...styles, ...loginStyles });

class AddClass extends Component {
  state = {
    isSubmitting: false,
    selectedRadio: 0,
    nameOfClass: '',
    classCode: '',
    errors: {}
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle('Add Class');
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
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();

    const data = {
      nameOfClass: this.state.nameOfClass,
      classCode: this.state.classCode
    };

    this.props.addClass(data, this.props.history);
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
                  <h4 className={styles.formTitle}>Add Class</h4>
                  <div className={styles.formSubtitle}>
                    Add Classes from here.
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
                      errorLabel: errors.classCode
                    })}
                    /* className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`} */
                  >
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

AddClass.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addClass: PropTypes.func.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addClass, updateCurrentRouteTitle }
)(withRouter(AddClass));
