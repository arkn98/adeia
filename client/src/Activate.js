import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.css';
import axios from 'axios';

class Activate extends Component {
  state = {
    email: '',
    staffId: '',
    password: '',
    password2: '',
    errors: {}
  };

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    const newUser = {
      email: this.state.email,
      staffId: this.state.staffId,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post('/api/users/activate', newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
  };

  render = () => {
    return (
      <div className={styles.root}>
        <div className={styles.app}>
          <div className={styles.banner}>
            <div className={styles.logo}>
              <Link to="/">LMS</Link>
            </div>
            <div className={styles.authbox}>
              <div className={styles.logo}>
                <Link to="/">LMS</Link>
              </div>
              <div className={styles.title}>Activate your account</div>
              <form onSubmit={this.formSubmitHandler} className={styles.block}>
                <div className={styles.marginBottom20}>
                  <div className={styles.inputLabel}>Staff ID</div>
                  <input
                    name="staffId"
                    onChange={this.inputOnChangeHandler}
                    value={this.state.staffId}
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.marginBottom20}>
                  <div className={styles.inputLabel}>Email</div>
                  <input
                    name="email"
                    onChange={this.inputOnChangeHandler}
                    value={this.state.email}
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.marginBottom20}>
                  <div className={styles.inputLabel}>Password</div>
                  <input
                    name="password"
                    onChange={this.inputOnChangeHandler}
                    type="password"
                    value={this.state.password}
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.marginBottom20}>
                  <div className={styles.inputLabel}>Confirm Password</div>
                  <input
                    name="password2"
                    onChange={this.inputOnChangeHandler}
                    type="password"
                    value={this.state.password2}
                    className={styles.inputField}
                  />
                </div>
                <button type="submit" className={styles.login}>
                  Continue
                </button>
                <div className={styles.marginTop4}>
                  <div className={`${styles.smallLink} ${styles.link}`}>
                    <Link to="/login">Already have an account?</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.footer}>
            <div>
              Currently maintained by&nbsp;
              <a
                href="https://github.com/arkn98"
                target="_blank"
                rel="noopener noreferrer"
              >
                Arun Kumar
              </a>
            </div>
            <div>|</div>
            <div>
              <a
                href="https://github.com/arkn98/lms"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source Code
              </a>
            </div>
            <div>|</div>
            <div>
              <a href="">Report Bugs</a>
            </div>
            <div>|</div>
            <div>
              <a href="">Feedback</a>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Activate;
