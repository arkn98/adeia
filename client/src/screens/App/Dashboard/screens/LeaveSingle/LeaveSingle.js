import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { WidthLimiter, Description } from 'screens/App/shared/common/FormInput';
import { InfoBox } from 'screens/App/shared/common/InfoBox';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import styles from './LeaveSingle.module.scss';
import { FullPageSpinner } from 'screens/App/shared/common/Spinner';
import { Breadcrumbs } from 'screens/App/shared/common/Breadcrumbs';
import { AltTable, AltTableReactTable } from 'screens/App/shared/common/Table';
import {
  leaveStatuses,
  leaveTypesLabels,
  leaveStatusLabels,
  accountTypes
} from 'data';
import Error from 'screens/App/shared/components/Error';
import dayjs from 'dayjs';

class LeaveSingle extends Component {
  state = {
    isLoading: true,
    isSubmitting: false,
    currentLeave: undefined,
    shouldShowActionButtons: false,
    isIntendedStaff: false
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(
      <Breadcrumbs
        levels={[{ title: this.props.parentPageTitle, to: '/dashboard/leave' }]}
        current={`${this.props.pageTitle} - ${this.props.match.params.leaveId}`}
      />
    );
    this.props.getLeaves().then(res => {
      const { leave, match } = this.props;
      const currentLeave = leave.leaveList.find(
        x => x.leaveId === match.params.leaveId
      );
      if (typeof currentLeave !== 'undefined') {
        this.setState({
          ...this.state,
          isLoading: false,
          currentLeave,
          isIntendedStaff: currentLeave.staff._id === this.props.auth.user.id,
          shouldShowActionButtons:
            currentLeave.staff._id === this.props.auth.user.id &&
            currentLeave.status !== leaveStatuses.REJECTEDBYALT &&
            currentLeave.status !== leaveStatuses.REJECTEDBYHOD &&
            currentLeave.status !== leaveStatuses.EXPIRED &&
            currentLeave.status !== leaveStatuses.CANCELLED &&
            currentLeave.status !== leaveStatuses.CANCELLEDWAITINGHODAPPROVAL
        });
      } else {
        this.setState({ ...this.state, isLoading: false });
      }
    });
  };

  render = () => {
    const { currentLeave } = this.state;
    if (this.state.isLoading) return <FullPageSpinner loadingPrimary={true} />;
    else {
      if (typeof currentLeave === 'undefined') {
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
        let data = [
          {
            title: 'Leave ID:',
            content: currentLeave.leaveId
          },
          {
            title: 'Apply date:',
            content: dayjs(currentLeave.applyDate)
              .format('DD-MMM-YYYY hh:mm:ss A')
              .toString()
          },
          {
            title: 'Leave type:',
            content: `${currentLeave.leaveType} - ${
              leaveTypesLabels[currentLeave.leaveType]
            }`
          }
        ];

        currentLeave.dayRange.forEach((item, index) => {
          data.push({
            title: index === 0 ? 'Dates:' : '',
            content: dayjs(item)
              .format('DD-MMM-YYYY - dddd')
              .toString()
          });
        });

        data.push({
          title: 'No. of days:',
          content: currentLeave.noOfDays
        });
        if (currentLeave.halfDaySession !== '') {
          data.push({
            title: 'Half-day session:',
            content:
              currentLeave.halfDaySession === 'FIRST' ? 'Forenoon' : 'Afternoon'
          });
        }
        data.push({
          title: 'Reason:',
          content: currentLeave.reason
        });

        data.push({
          title: 'Is it a vacation?',
          content: currentLeave.isVacation ? 'Yes' : 'No'
        });

        if (currentLeave.address !== '') {
          data.push({ title: 'Address:', content: currentLeave.address });
        }

        if (currentLeave.isDocumentProvided) {
          data.push({
            title: 'Uploaded document:',
            content: (
              <Fragment>
                <div>
                  <a
                    href={`/uploads?leaveId=${currentLeave.leaveId}&token=${
                      this.props.auth.user.OTToken
                    }`}
                    className={styles.linkBlue}
                    target="_blank"
                    rel="noopener noreferrer">
                    View
                  </a>
                </div>
              </Fragment>
            )
          });
          data.push({
            title: '',
            content: (
              <Description style={{ marginBottom: '0' }}>
                (One-time tokens are used for access control. So if a document
                takes long time to load, try refreshing this page and then
                accessing the file.)
              </Description>
            )
          });
        }

        data.push({
          title: 'Status:',
          content: leaveStatusLabels[currentLeave.status]
        });

        return (
          <Fragment>
            <WidthLimiter>
              <InfoBox
                topLeftLabel="Details"
                topRightLabel="Details"
                topLeftChildren={data}
              />
            </WidthLimiter>
            {currentLeave.alterations.length !== 0 ? (
              <Fragment>
                <AltTableReactTable
                  setRef={element => {
                    this.reactTable = element;
                  }}
                  data={currentLeave.alterations}
                  filterable={false}
                  hoverable={false}
                  containerStyles={styles.marginBottom20}
                  columns={[
                    {
                      Header: () => (
                        <div style={{ textAlign: 'left' }}>Type</div>
                      ),
                      accessor: 'alternationOption',
                      id: 'alternationOption',
                      Cell: ({ row }) =>
                        row.alternationOption === 'ALTERNATE' ? 'ALT' : 'POST',
                      width: 60
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'left' }}>Alteration ID</div>
                      ),
                      accessor: 'alterationId',
                      id: 'alterationId',
                      Cell: ({ row }) => {
                        return this.props.auth.user.accountType ===
                          accountTypes.ADMIN ||
                          this.props.auth.user.accountType ===
                            accountTypes.OFFICE ? (
                          <Link
                            to={`/dashboard/alteration/${row.alterationId}`}
                            className={styles.linkBlue}>
                            {row.alterationId}
                          </Link>
                        ) : (
                          row.alterationId
                        );
                      },
                      width: 120
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'left' }}>Date</div>
                      ),
                      accessor: 'originalDate',
                      id: 'originalDate',
                      Cell: ({ row }) =>
                        dayjs(row.originalDate).format('DD-MMM-YY ddd'),
                      width: 128
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'right' }}>Hour</div>
                      ),
                      id: 'originalHour',
                      accessor: 'originalHour',
                      Cell: ({ row }) => (
                        <div style={{ textAlign: 'right' }}>
                          {row.originalHour}
                        </div>
                      ),
                      width: 64
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'left' }}>Class</div>
                      ),
                      id: 'class',
                      accessor: 'class',
                      Cell: ({ row }) => row.class.classCode,
                      width: 96
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'left' }}>
                          Alternating Staff
                        </div>
                      ),
                      id: 'alternatingStaff',
                      accessor: 'alternatingStaff',
                      Cell: ({ row }) => row.alternatingStaff.name,
                      width: 216
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'left' }}>New Date</div>
                      ),
                      accessor: 'alterationDate',
                      id: 'alterationDate',
                      Cell: ({ row }) =>
                        dayjs(row.alterationDate).format('DD-MMM-YY ddd'),
                      width: 128
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'right' }}>New Hour</div>
                      ),
                      id: 'alterationHour',
                      accessor: 'alterationHour',
                      Cell: ({ row }) => (
                        <div style={{ textAlign: 'right' }}>
                          {row.alterationHour}
                        </div>
                      ),
                      width: 64
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'left' }}>Status</div>
                      ),
                      accessor: 'status',
                      id: 'status',
                      Cell: ({ row }) => row.status,
                      width: 104
                    }
                  ]}
                  loading={this.state.isLoading}
                  defaultSorted={[{ id: 'applyDate', desc: true }]}
                  onPageChange={this.onPageChange}
                  minRows={0}
                  showPagination={false}
                  sortable={false}
                  onPageSizeChange={this.onPageSizeChange}
                />
                {/* <AltTable
                  thead={[
                    {
                      value: 'Type',
                      style: {
                        width: '36px',
                        maxWidth: '36px',
                        flex: '36 0 auto'
                      }
                    },
                    {
                      value: 'Alteration ID',
                      style: {
                        width: '84px',
                        maxWidth: '84px',
                        flex: '84 0 auto'
                      }
                    },
                    {
                      value: 'Date',
                      style: {
                        width: '102px',
                        maxWidth: '102px',
                        flex: '102 0 auto'
                      }
                    },
                    {
                      value: 'Hour',
                      style: {
                        width: '30px',
                        maxWidth: '30px',
                        flex: '30 0 auto'
                      }
                    },
                    {
                      value: 'Class',
                      style: {
                        width: '64px',
                        maxWidth: '64px',
                        flex: '64 0 auto'
                      }
                    },
                    {
                      value: 'Alternating Staff',
                      style: {
                        width: '144px',
                        maxWidth: '144px',
                        flex: '144 0 auto'
                      }
                    },
                    {
                      value: 'New Date',
                      style: {
                        width: '102px',
                        maxWidth: '102px',
                        flex: '102 0 auto'
                      }
                    },
                    {
                      value: 'New Hour',
                      style: {
                        width: '30px',
                        maxWidth: '30px',
                        flex: '30 0 auto'
                      }
                    },
                    {
                      value: 'Status',
                      style: { width: '100px', flex: '100 0 auto' }
                    }
                  ]}
                  containerStyles={styles.marginBottom20}
                  adaptForFullWidth={true}
                  tbody={currentLeave.alterations.map((item, index) => {
                    return [
                      {
                        value:
                          item.alternationOption === 'ALTERNATE'
                            ? 'ALT'
                            : 'POST',
                        style: {}
                      },
                      {
                        value:
                          this.props.auth.user.accountType ===
                            accountTypes.ADMIN ||
                          this.props.auth.user.accountType ===
                            accountTypes.OFFICE ? (
                            <Link
                              to={`/dashboard/alteration/${item.alterationId}`}
                              className={styles.linkBlue}>
                              {item.alterationId}
                            </Link>
                          ) : (
                            item.alterationId
                          ),
                        style: {}
                      },
                      {
                        value: dayjs(item.originalDate).format('DD-MMM-YY ddd'),
                        style: {}
                      },
                      {
                        value: item.originalHour,
                        style: { textAlign: 'right' }
                      },
                      {
                        value: item.class.classCode,
                        style: {}
                      },
                      {
                        value: item.alternatingStaff.name,
                        style: {}
                      },
                      {
                        value: dayjs(item.alterationDate).format(
                          'DD-MMM-YY ddd'
                        ),
                        style: {}
                      },
                      {
                        value: item.alterationHour,
                        style: { textAlign: 'right' }
                      },
                      {
                        value: item.status,
                        style: {}
                      }
                    ];
                  })}
                /> */}
              </Fragment>
            ) : (
              <Description>No alterations. You're good to go.</Description>
            )}
            <WidthLimiter>
              {this.state.isIntendedStaff ? (
                this.state.shouldShowActionButtons ? (
                  <ButtonSubmit
                    onClick={this.cancelHandler}
                    sizeSmall={true}
                    type="danger"
                    className={styles.marginBottom20}
                    isLoading={this.state.isSubmitting}>
                    Request cancellation
                  </ButtonSubmit>
                ) : null
              ) : null}
            </WidthLimiter>
          </Fragment>
        );
      }
    }
  };
}

export default withRouter(LeaveSingle);
