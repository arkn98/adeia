import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { WidthLimiter, Description } from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import { Breadcrumbs } from 'screens/App/shared/common/Breadcrumbs';
import styles from './AlterationSingle.module.scss';
import { FullPageSpinner } from 'screens/App/shared/common/Spinner';
import { InfoBox } from 'screens/App/shared/common/InfoBox';
import Error from 'screens/App/shared/components/Error';
import dayjs from 'dayjs';

class AlterationSingle extends Component {
  state = {
    isLoading: true,
    isAcceptSubmitting: false,
    isRejectSubmitting: false,
    currentAlteration: undefined,
    shouldShowActionButtons: false,
    isIntendedStaff: false
  };

  acceptHandler = event => {
    this.setState({ ...this.state, isAcceptSubmitting: true });
    event.preventDefault();
    if (!window.confirm('Warning! This cannot be undone. Are you sure?')) {
      return;
    }

    this.props
      .setAlterationStatus({
        alterationId: this.state.currentAlteration.alterationId,
        status: 'ACCEPTED'
      })
      .then(() => {
        this.props.getAlterations().then(res => {
          const { alterations, match } = this.props;
          const currentAlteration = alterations.alterationList.find(
            x => x.alterationId === match.params.alterationId
          );
          this.setState(
            {
              ...this.state,
              currentAlteration,
              isAcceptSubmitting: false,
              shouldShowActionButtons: false
            },
            () => {
              this.props.showPopout({
                type: 'modalSingleButton',
                title: 'Action successful',
                message: 'Alteration successfully accepted.',
                buttonPrimary: true,
                buttonContent: 'Okay'
              });
            }
          );
        });
      });
  };

  rejectHandler = event => {
    this.setState({ ...this.state, isRejectSubmitting: true });
    event.preventDefault();
    if (!window.confirm('Warning! This cannot be undone. Are you sure?')) {
      return;
    }

    this.props
      .setAlterationStatus({
        alterationId: this.state.currentAlteration.alterationId,
        status: 'REJECTED'
      })
      .then(() => {
        this.props.getAlterations().then(res => {
          const { alterations, match } = this.props;
          const currentAlteration = alterations.alterationList.find(
            x => x.alterationId === match.params.alterationId
          );
          this.setState(
            {
              ...this.state,
              currentAlteration,
              isRejectSubmitting: false,
              shouldShowActionButtons: false
            },
            () => {
              this.props.showPopout({
                type: 'modalSingleButton',
                title: 'Action successful',
                message: 'Alteration successfully rejected.',
                buttonPrimary: true,
                buttonContent: 'Okay'
              });
            }
          );
        });
      });
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(
      <Breadcrumbs
        levels={[
          { title: this.props.parentPageTitle, to: '/dashboard/alteration' }
        ]}
        current={`${this.props.pageTitle} - ${
          this.props.match.params.alterationId
        }`}
      />
    );
    this.props.getAlterations().then(res => {
      const { alterations, match } = this.props;
      const currentAlteration = alterations.alterationList.find(
        x => x.alterationId === match.params.alterationId
      );
      if (typeof currentAlteration !== 'undefined') {
        this.setState({
          ...this.state,
          isLoading: false,
          currentAlteration,
          isIntendedStaff:
            currentAlteration.alternatingStaff.staffId ===
            this.props.auth.user.staffId,
          shouldShowActionButtons:
            currentAlteration.alternatingStaff.staffId ===
              this.props.auth.user.staffId &&
            currentAlteration.status !== 'ACCEPTED' &&
            currentAlteration.status !== 'REJECTED'
        });
        this.props.setAlterationAsViewed(currentAlteration.alterationId);
      } else {
        this.setState({ ...this.state, isLoading: false });
      }
    });
  };

  render = () => {
    const { currentAlteration } = this.state;
    if (this.state.isLoading) return <FullPageSpinner loadingPrimary={true} />;
    else {
      if (typeof currentAlteration === 'undefined') {
        return (
          <Error
            updateCurrentRouteTitle={this.props.updateCurrentRouteTitle}
            pageTitle="Page not found"
            inDashboard={true}
            message="We can't find the page that you're looking for :("
            footerAltColors={false}
            showButton={true}
            showIllustration="not-found"
            buttonLocation="back"
            buttonContent="Go back">
            404
          </Error>
        );
      } else {
        return (
          <WidthLimiter>
            <InfoBox
              topLeftLabel="Details"
              topRightLabel="Details"
              topLeftChildren={[
                {
                  title: 'Alteration ID:',
                  content: currentAlteration.alterationId
                },
                {
                  title: 'Leave ID:',
                  content: currentAlteration.leaveId
                },
                {
                  title: 'Staff:',
                  content: `${currentAlteration.originalStaff.staffId} - ${
                    currentAlteration.originalStaff.name
                  }`
                },
                {
                  title: 'Class:',
                  content: `${currentAlteration.class.classCode} - ${
                    currentAlteration.class.nameOfClass
                  }`
                },
                {
                  title: 'Alteration date:',
                  content: dayjs(currentAlteration.alterationDate)
                    .format('DD-MMM-YYYY - dddd')
                    .toString()
                },
                {
                  title: 'Alteration hour:',
                  content: currentAlteration.alterationHour
                },
                {
                  title: 'Alteration status:',
                  content: currentAlteration.status
                },
                {
                  title: 'Leave approval status:',
                  content: currentAlteration.leaveApproved
                }
              ]}
            />
            {this.state.isIntendedStaff ? (
              this.state.shouldShowActionButtons ? (
                <div style={{ display: 'flex' }}>
                  <ButtonSubmit
                    onClick={this.rejectHandler}
                    sizeSmall={true}
                    type="danger"
                    className={styles.marginBottom20}
                    style={{ marginRight: '8px' }}
                    isLoading={this.state.isRejectSubmitting}>
                    Reject
                  </ButtonSubmit>
                  <ButtonSubmit
                    onClick={this.acceptHandler}
                    sizeSmall={true}
                    className={styles.marginBottom20}
                    isLoading={this.state.isAcceptSubmitting}>
                    Accept
                  </ButtonSubmit>
                </div>
              ) : (
                <Description>
                  Action already submitted. Cannot be changed now.
                </Description>
              )
            ) : null}
          </WidthLimiter>
        );
      }
    }
  };
}

export default withRouter(AlterationSingle);
