import React, { Component } from 'react';
import mainStyles from './Main.css';
import styles from './LeaveApplication.css';
import loginStyles from '../Login.css';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';

const cx = classNames.bind({ ...mainStyles, ...styles, ...loginStyles });

class AddAdmin extends Component {
  state = {
    staffId: '',
    name: '',
    designation: '',
    category: '',
    errors: {}
  };

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    const newUser = {
      staffId: this.state.staffId,
      name: this.state.name,
      designation: this.state.designation,
      category: this.state.category
    };

    console.log(newUser);

    axios
      .post('/api/users/add-admin', newUser)
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err.response.data);
        this.setState({ ...this.state, errors: err.response.data });
      });
  };

  render() {
    const errors = this.state.errors;
    return (
      <div className={mainStyles.main}>
        <div className={mainStyles.topBarWrapper}>
          <div className={mainStyles.topBar}>
            <div className={mainStyles.pageTitle}>Add Admin</div>
            <div className={mainStyles.headerIcons}>
              {/* <div className={mainStyles.searchBarWrapper}>
                <div className={mainStyles.searchBar}>
                  <div className={mainStyles.search} />
                </div>
              </div>
              <div className={mainStyles.seperator} /> */}
              <div className={mainStyles.iconWrapper}>
                <a
                  title="GitHub Repo"
                  href="https://github.com/arkn98/lms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className={`icon ion-md-notifications ${
                      mainStyles.customHeaderIcon
                    }`}
                  />
                </a>
              </div>
              <div className={mainStyles.iconWrapper}>
                <a
                  title="GitHub Repo"
                  href="https://github.com/arkn98/lms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className={`icon ion-md-help ${
                      mainStyles.customHeaderIcon
                    }`}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={mainStyles.scrollWrapper}>
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
                    }}
                  >
                    <h4 className={styles.formTitle}>Add Admin</h4>
                    {/* <div className={styles.formSubtitle}>
                      Please note that your leave applications may not always be
                      approved. Contact HOD/Office if you have any queries.
                    </div> */}
                  </div>
                </div>
                <form
                  onSubmit={this.formSubmitHandler}
                  className={styles.formBody}
                >
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}
                  >
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
                    }`}
                  >
                    <h5
                      className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`}
                    >
                      Name
                    </h5>
                    <div className={styles.inputWrapper}>
                      <input
                        onChange={this.inputOnChangeHandler}
                        name="name"
                        value={this.state.name}
                        className={styles.formInput}
                        type="text"
                      />
                    </div>
                  </div>
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}
                  >
                    <h5
                      className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`}
                    >
                      Designation
                    </h5>
                    <div className={styles.inputWrapper}>
                      <input
                        onChange={this.inputOnChangeHandler}
                        name="designation"
                        value={this.state.designation}
                        className={styles.formInput}
                        type="text"
                      />
                    </div>
                  </div>
                  <div
                    className={`${mainStyles.marginBottom20} ${
                      styles.formItemWrapper
                    }`}
                  >
                    <h5
                      className={`${styles.formFieldLabel} ${
                        mainStyles.marginBottom8
                      }`}
                    >
                      Category
                    </h5>
                    <div className={styles.inputWrapper}>
                      <select
                        onChange={this.inputOnChangeHandler}
                        name="category"
                        value={this.state.category}
                        className={`${styles.formInput} ${styles.formSelect}`}
                        type="text"
                      >
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
                    }`}
                  >
                    <div
                      className={`${styles.inputWrapper} ${
                        mainStyles.marginTop8
                      }`}
                    >
                      <button
                        style={{ borderRadius: '5px' }}
                        type="submit"
                        className={loginStyles.login}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </form>
                <div className={styles.formSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAdmin;
