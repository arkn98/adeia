import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-table/react-table.css';
//import styles from './LeaveSingle.module.scss';
import { FullPageSpinner } from 'screens/App/shared/common/Spinner';
import Error from 'screens/App/shared/components/Error';
//import dayjs from 'dayjs';

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
    else {
      if (typeof currentLeave === 'undefined')
        return (
          <Error
            updateCurrentRouteTitle={this.props.updateCurrentRouteTitle}
            pageTitle="Page not found"
            inDashboard={true}
            message="We can't find the page that you're looking for :("
            footerAltColors={false}
            showButton={true}
            buttonLocation="back"
            buttonContent="Go back">
            404
          </Error>
        );
      else return <Fragment>{currentLeave.leaveId}</Fragment>;
    }
  };
}

export default withRouter(LeaveSingle);
