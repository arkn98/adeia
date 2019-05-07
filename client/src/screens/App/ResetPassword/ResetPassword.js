import React, { Component } from 'react';
import styles from '../shared/styles/LandingForm.module.scss';
import { Link, withRouter } from 'react-router-dom';
import { ButtonLink, ButtonSubmit } from '../shared/common/Button';
import { Footer } from '../shared/components/Footer';
import { TextBox } from '../shared/common/FormInput';
import queryString from 'query-string';

class ResetPassword extends Component {
  state = {
    isSubmitting: false,
    isLoading: true,
    password: '',
    password2: '',
    user: {},
    transitionEnd: false,
    errors: {}
  };

  componentDidMount = () => {
    if (typeof this.newPasswordInput !== 'undefined') {
      setTimeout(() => {
        this.newPasswordInput.setFocus();
      }, 250);
    }

    setTimeout(() => {
      this.setState({
        ...this.state,
        transitionEnd: true
      });
    }, 0);
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
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  resetPasswordHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();
    const newObj = {
      token: queryString.parse(this.props.location.search).token,
      staffId: this.props.user.staffId,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.resetPassword(newObj).then(res => {
      this.props.showPopout({
        type: 'modalSingleButton',
        title: 'Password Changed',
        message: 'Your password was successfully changed.',
        buttonPrimary: true,
        buttonContent: 'Okay'
      });
      this.props.history.push('/login');
    });
  };

  render = () => {
    const { errors, user } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.app}>
          <div className={styles.dummy}>
            <div className={styles.banner}>
              <div className={styles.logo}>
                <Link to="/">LMS</Link>
              </div>
              <div
                id="authbox"
                className={
                  this.state.transitionEnd
                    ? `${styles.authbox} ${styles.authboxTransitionEnd}`
                    : styles.authbox
                }>
                <div className={styles.logo} style={{ marginBottom: '64px' }}>
                  <Link to="/">LMS</Link>
                </div>
                <div className={styles.title}>Reset your password</div>
                <div className={styles.subTitle}>
                  {user.name} - {user.email}
                </div>
                <form
                  onSubmit={this.loginSubmitHandler}
                  className={styles.block}>
                  <TextBox
                    name="password"
                    label="New Password"
                    type="password"
                    description="Must be atleast 8 characters long."
                    value={this.state.password}
                    ref={input => {
                      this.newPasswordInput = input;
                    }}
                    inputOnChangeHandler={this.inputOnChangeHandler}
                    errors={errors.password}
                    containerStyles={styles.marginBottom20}
                  />
                  <TextBox
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    value={this.state.password2}
                    inputOnChangeHandler={this.inputOnChangeHandler}
                    errors={errors.password2}
                    containerStyles={styles.marginBottom20}
                  />
                  <ButtonSubmit
                    onClick={this.resetPasswordHandler}
                    className={styles.marginBottom8}
                    isLoading={this.state.isSubmitting}
                    style={{ width: '100%' }}>
                    Reset Password
                  </ButtonSubmit>
                  <div className={styles.marginTop4}>
                    <span className={styles.needAccount}>
                      Know your password?
                    </span>
                    <ButtonLink
                      onClick={() => this.props.history.push('/login')}
                      isSmall={true}>
                      Login here
                    </ButtonLink>
                  </div>
                </form>
              </div>
            </div>
            <Footer altColors={true} />
          </div>
        </div>
      </div>
    );
  };
}

export default withRouter(ResetPassword);
