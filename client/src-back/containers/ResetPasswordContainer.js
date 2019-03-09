import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ForgotPassword from '../components/ResetPassword';
import {
  loginUser,
  sendResetEmail,
  setLoginAttempts,
  activateUser,
  clearErrors,
  clearResetToken,
  resetPassword
} from '../actions/authActions';

const mapStateToProps = state => ({
  auth: state.auth,
  utils: state.utils,
  errors: state.errors
});

const ForgotPasswordContainer = connect(
  mapStateToProps,
  {
    loginUser,
    sendResetEmail,
    setLoginAttempts,
    activateUser,
    clearErrors,
    clearResetToken,
    resetPassword
  }
)(withRouter(ForgotPassword));

export default ForgotPasswordContainer;
