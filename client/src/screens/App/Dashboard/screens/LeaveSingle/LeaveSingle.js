import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import 'react-table/react-table.css';
import styles from './LeaveSingle.module.scss';
/*import leaveTypes from 'data/leaveTypes'; */
import { FullPageSpinner } from 'screens/App/shared/common/Spinner';
import dayjs from 'dayjs';

class LeaveSingle extends Component {
  state = {
    isLoading: true
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(this.props.pageTitle);
    this.props.getLeaves().then(res => {
      this.setState({ ...this.state, isLoading: false });
    });
  };

  render = () => {
    const { leave, match } = this.props;
    const currentLeave = leave.leaveList.find(
      x => x.leaveId === match.params.leaveId
    );
    if (this.state.isLoading)
      return (
        <Fragment>
          <FullPageSpinner loadingPrimary={true} />
        </Fragment>
      );
    /* else return null; */ else
      return (
        <Fragment>
          {currentLeave.leaveId}
          {match.params.leaveId}
        </Fragment>
      );
  };
}

export default withRouter(LeaveSingle);
