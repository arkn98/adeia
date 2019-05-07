import React, { Component } from 'react';
import ResetPassword from './ResetPassword';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import Error from '../shared/components/Error';
import { clearResetToken, resetPassword } from '../../../shared/actions';

class ResetPasswordContainer extends Component {
  state = {
    isLoading: true,
    user: {},
    shouldDisplay: false,
    token: ''
  };

  componentWillMount = () => {
    const parsed = queryString.parse(this.props.location.search);
    const token = typeof parsed.token !== 'undefined' ? parsed.token : '';
    axios
      .get('/api/account/check-reset-token', {
        params: {
          token: token
        }
      })
      .then(res => {
        this.setState({
          ...this.state,
          shouldDisplay: res.data.status,
          isLoading: false,
          user: res.data.status ? res.data.user : {},
          token
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...this.state,
          isLoading: false,
          shouldDisplay: false,
          token: ''
        });
      });
  };

  render = () => {
    if (this.state.isLoading) {
      return (
        <Error footerAltColors={true} showButton={false} loadingText={true}>
          Authorizing
        </Error>
      );
    } else {
      if (this.state.shouldDisplay) {
        return (
          <ResetPassword
            {...this.props}
            clearResetToken={this.props.clearResetToken}
            resetPassword={this.props.resetPassword}
            errors={this.props.errors}
            user={this.state.user}
          />
        );
      } else {
        return (
          <Error
            message="The link you're trying to visit may have expired or is invalid."
            footerAltColors={true}
            showButton={true}
            buttonContent="Home"
            showIllustration="not-found"
            buttonLocation="/">
            Invalid Link
          </Error>
        );
      }
    }
  };
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    clearResetToken,
    resetPassword
  }
)(withRouter(ResetPasswordContainer));
