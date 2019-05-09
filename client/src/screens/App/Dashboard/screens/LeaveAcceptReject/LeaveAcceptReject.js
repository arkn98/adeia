import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './LeaveAcceptReject.module.scss';
import { AltTableReactTable } from 'screens/App/shared/common/Table';
import { accountTypes, staffTypes } from 'data';
import { TopFilter } from 'screens/App/shared/common/TopFilter';
import dayjs from 'dayjs';

class LeaveAcceptReject extends Component {
  state = {
    isLoading: true,
    leaves: []
  };

  filterChangeHandler = val => {
    this.props.acceptRejectFilterHandler(val);
  };

  componentDidMount = () => {
    this.setFilter();
    this.props.getLeaves().then(res => {
      this.setState({
        ...this.state,
        leaves: this.props.leave.leaveList,
        isLoading: false
      });
    });
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.acceptRejectFilter !== this.props.acceptRejectFilter) {
      this.setFilter();
      let newLeaves = this.props.leave.leaveList.filter(x =>
        this.props.acceptRejectFilter.includes(x.staff.staffType)
      );
      this.setState({ ...this.state, leaves: newLeaves });
    }
  };

  setFilter = () => {
    this.props.updateCurrentRouteTitle(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '8px' }}>{this.props.pageTitle}</div>
        <div className={`${styles.topBarDivider} ${styles.mobileInvisible}`} />
        <TopFilter
          containerStyles={styles.mobileInvisible}
          currentFilter={this.props.acceptRejectFilter}
          filters={[
            {
              name: 'All',
              value: Object.values(staffTypes),
              onClick: this.filterChangeHandler
            },
            {
              name: 'Teaching',
              value: [staffTypes.RT, staffTypes.TF],
              onClick: this.filterChangeHandler
            },
            {
              name: 'Non-teaching',
              value: [staffTypes.NT, staffTypes.RNT],
              onClick: this.filterChangeHandler
            },
            {
              name: 'Research Scholars',
              value: [staffTypes.RS30, staffTypes.RS20, staffTypes.RSO],
              onClick: this.filterChangeHandler
            }
          ]}
        />
      </div>
    );
  };

  render = () => {
    const columns = [
      {
        Header: () => <div style={{ textAlign: 'left' }}>Leave ID</div>,
        accessor: 'leaveId',
        id: 'leaveId',
        Cell: ({ row }) => (
          <Link to={{ pathname: `/dashboard/leave/${row.leaveId}` }}>
            <div className={styles.linkBlue}>{row.leaveId}</div>
          </Link>
        ),
        width: 128
      }
    ];
    if (
      this.props.auth.user.accountType === accountTypes.ADMIN ||
      this.props.auth.user.accountType === accountTypes.OFFICE
    ) {
      columns.push({
        Header: () => <div style={{ textAlign: 'left' }}>Applied Date</div>,
        id: 'staff',
        sortable: true,
        Cell: props => props.original.staff.name,
        width: 162
      });
    }
    const temp = [
      {
        Header: () => <div style={{ textAlign: 'left' }}>Applied Date</div>,
        accessor: 'applyDate',
        sortable: true,
        Cell: ({ row }) =>
          dayjs(row.applyDate).format('DD-MMM-YYYY hh:mm:ss A'),
        width: 192
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>From</div>,
        id: 'from',
        accessor: 'from',
        Cell: ({ row }) => dayjs(row.from).format('DD-MMM-YYYY'),
        width: 108
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>To</div>,
        id: 'to',
        accessor: 'to',
        Cell: ({ row }) => dayjs(row.to).format('DD-MMM-YYYY'),
        width: 108
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Leave type</div>,
        accessor: 'leaveType',
        id: 'leaveType',
        Cell: ({ row }) => row.leaveType,
        width: 64
      },
      {
        Header: () => <div style={{ textAlign: 'right' }}>No. of Days</div>,
        accessor: 'noOfDays',
        id: 'noOfDays',
        Cell: ({ row }) => (
          <div style={{ textAlign: 'right' }}>{row.noOfDays}</div>
        ),
        width: 72
      }
    ];
    columns.push(...temp);

    return (
      <Fragment>
        <TopFilter
          label="Filter:"
          containerStyles={`${styles.mobileVisible} ${styles.marginBottom20}`}
          currentFilter={this.props.acceptRejectFilter}
          filters={[
            {
              name: 'All',
              value: Object.values(staffTypes),
              onClick: this.filterChangeHandler
            },
            {
              name: 'Teaching',
              value: [staffTypes.RT, staffTypes.TF],
              onClick: this.filterChangeHandler
            },
            {
              name: 'Non-teaching',
              value: [staffTypes.NT, staffTypes.RNT],
              onClick: this.filterChangeHandler
            },
            {
              name: 'Research Scholars',
              value: [staffTypes.RS30, staffTypes.RS20, staffTypes.RSO],
              onClick: this.filterChangeHandler
            }
          ]}
        />
        <AltTableReactTable
          data={this.state.leaves}
          columns={columns}
          loading={this.state.isLoading}
          defaultSorted={[{ id: 'applyDate', desc: true }]}
        />
      </Fragment>
    );
  };
}

export default LeaveAcceptReject;
