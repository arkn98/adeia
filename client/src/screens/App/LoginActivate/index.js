import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginActivate from './LoginActivate';
import {
  loginUser,
  sendResetEmail,
  setLoginAttempts,
  activateUser,
  clearErrors
} from 'shared/actions';

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  utils: state.utils,
  errors: state.errors,
  ...ownProps
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
