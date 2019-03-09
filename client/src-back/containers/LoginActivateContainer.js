import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginActivate from '../components/LoginActivate';
import {
  loginUser,
  sendResetEmail,
  setLoginAttempts,
  activateUser,
  clearErrors
} from '../actions/authActions';

const mapStateToProps = state => ({
  auth: state.auth,
  utils: state.utils,
  errors: state.errors
});

const LoginActivateContainer = connect(
  mapStateToProps,
  {
    loginUser,
    sendResetEmail,
    setLoginAttempts,
    activateUser,
    clearErrors
  }
)(withRouter(LoginActivate));

export default LoginActivateContainer;
