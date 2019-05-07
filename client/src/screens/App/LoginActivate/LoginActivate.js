import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../shared/styles/LandingForm.module.scss';
import { ButtonSubmit, ButtonLink } from '../shared/common/Button';
import { Footer } from '../shared/components/Footer';
import { TextBox } from '../shared/common/FormInput';

class LoginActivate extends Component {
  state = {
    isSubmitting: false,
    email: '',
    password: '',
    password2: '',
    staffId: '',
    transitionEnd: false,
    errors: {}
  };

  componentDidMount = () => {
    if (!this.props.auth.isAuthenticated) {
      if (typeof this.emailInput !== 'undefined')
        setTimeout(() => {
          this.emailInput.setFocus();
        }, 250);
      if (typeof this.staffIdInput !== 'undefined')
        setTimeout(() => {
          this.staffIdInput.setFocus();
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
    if (event.target.name === 'email')
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value.toLowerCase()
      });
    else
      this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  activateSubmitHandler = event => {
    this.setState({ ...this.state, isSubmitting: true });
    event.preventDefault();

    const newUser = {
      email: this.state.email,
      staffId: this.state.staffId,
      password: this.state.password,
      password2: this.state.password2
    };

    const newProfile = {
      staffId: this.state.staffId,
      prevLogins: {},
      cplCredits: 0,
      leaveAllotted: {}
    };

    this.props.activateUser(newUser, newProfile).then(() => {
      this.setState(
        {
          ...this.state,
          staffId: '',
          email: '',
          password: '',
          password2: '',
          errors: {},
          isSubmitting: false
        },
        () => {
          this.props.showPopout({
            type: 'modalSingleButton',
            title: 'Action successful',
            message: 'Account successfully activated.',
            buttonPrimary: true,
            buttonContent: 'Okay'
          });
          this.props.history.push('/login');
        }
      );
    });
  };

  forgotPasswordHandler = event => {
    event.preventDefault();
    const state = this.state;
    this.setState({ ...state, isSubmitting: true });
    this.props.sendResetEmail({ email: state.email }).then(() => {
      this.props.showPopout({
        type: 'modalSingleButton',
        title: 'Instructions Sent',
        message:
          'We sent instructions to change your password to ' +
          state.email +
          ', please check both your inbox & spam folder.',
        buttonPrimary: true,
        buttonContent: 'Okay'
      });
    });
  };

  componentWillUnmount = () => {
    this.props.clearErrors();
  };

  loginSubmitHandler = event => {
    event.preventDefault();
    const state = this.state;
    const { location } = this.props;
    this.setState({ ...state, isSubmitting: true });
    this.props.loginUser(
      { email: state.email, password: state.password },
      this.props.history,
      typeof location.state === 'undefined'
        ? undefined
        : location.state.destination
    );
  };

  render() {
    const { errors } = this.state;
    const { history, match } = this.props;
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated) return <Redirect to="/dashboard" />;

    let toRender = null;
    if (match.path === '/login') {
      toRender = (
        <div
          id="authbox"
          className={
            this.state.transitionEnd
              ? `${styles.authbox} ${styles.authboxTransitionEnd}`
              : styles.authbox
          }>
          <div className={styles.logo}>
            <Link to="/">LMS</Link>
          </div>
          <div className={styles.title}>Welcome back!</div>
          {/* <div className={styles.subTitle}>
            We're so excited to see you again!
          </div> */}
          <form onSubmit={this.loginSubmitHandler} className={styles.block}>
            <TextBox
              name="email"
              label="Email"
              type="email"
              value={this.state.email}
              inputOnChangeHandler={this.inputOnChangeHandler}
              errors={errors.email}
              ref={input => {
                this.emailInput = input;
              }}
              containerStyles={styles.marginBottom20}
            />
            <TextBox
              name="password"
              label="Password"
              type="password"
              value={this.state.password}
              inputOnChangeHandler={this.inputOnChangeHandler}
              errors={errors.password}
              containerStyles={styles.marginBottom6}
            />
            <ButtonLink
              className={styles.marginBottom20}
              onClick={this.forgotPasswordHandler}>
              Forgot your password?
            </ButtonLink>
            <ButtonSubmit
              className={styles.marginBottom8}
              isLoading={this.state.isSubmitting}
              style={{ width: '100%' }}>
              Login
            </ButtonSubmit>
            <div className={styles.marginTop4}>
              <span className={styles.needAccount}>Account not activated?</span>
              <ButtonLink
                onClick={() => {
                  this.props.clearErrors();
                  this.setState({
                    ...this.state,
                    transitionEnd: false,
                    path: '/activate'
                  });
                  history.push('/activate');
                  this.forceUpdate();
                }}
                isSmall={true}>
                Activate here
              </ButtonLink>
            </div>
          </form>
        </div>
      );
    } else {
      toRender = (
        <div
          id="authbox"
          className={
            this.state.transitionEnd
              ? `${styles.authbox} ${styles.authboxTransitionEnd}`
              : styles.authbox
          }>
          <div className={styles.logo}>
            <Link to="/">LMS</Link>
          </div>
          <div className={styles.title}>Activate your account</div>
          {/* <div className={styles.subTitle}>
            We're so excited to see you again!
          </div> */}
          <form onSubmit={this.activateSubmitHandler} className={styles.block}>
            <TextBox
              name="staffId"
              label="Staff ID"
              type="text"
              description="Enter Staff ID provided by the administrator."
              inputOnChangeHandler={this.inputOnChangeHandler}
              errors={errors.staffId}
              ref={input => {
                this.staffIdInput = input;
              }}
              value={this.state.staffId}
              containerStyles={styles.marginBottom20}
            />
            <TextBox
              name="email"
              label="Email"
              type="text"
              description="Use your primary email as it will be used for signing in and also for email communication."
              value={this.state.email}
              inputOnChangeHandler={this.inputOnChangeHandler}
              errors={errors.email}
              containerStyles={styles.marginBottom20}
            />
            <TextBox
              name="password"
              label="Password"
              type="password"
              description="Must be atleast 8 characters long."
              value={this.state.password}
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
              className={styles.marginBottom8}
              isLoading={this.state.isSubmitting}
              style={{ width: '100%' }}>
              Activate
            </ButtonSubmit>
            <div className={styles.marginTop4}>
              <span className={styles.needAccount}>
                Account already activated?
              </span>
              <ButtonLink
                onClick={() => {
                  this.props.clearErrors();
                  this.setState({
                    ...this.state,
                    transitionEnd: false,
                    path: '/login'
                  });
                  this.forceUpdate();
                  history.push('/login');
                }}
                isSmall={true}>
                Login here
              </ButtonLink>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className={styles.root}>
        <div className={styles.app}>
          <div className={styles.dummy}>
            <div className={styles.banner}>
              <div className={styles.logo}>
                <Link to="/">LMS</Link>
              </div>
              {toRender}
            </div>
            <Footer altColors={true} />
          </div>
        </div>
      </div>
    );
  }
}

LoginActivate.propTypes = {
  auth: PropTypes.object.isRequired,
  utils: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  sendResetEmail: PropTypes.func.isRequired,
  setLoginAttempts: PropTypes.func.isRequired,
  activateUser: PropTypes.func.isRequired
};

export default LoginActivate;
