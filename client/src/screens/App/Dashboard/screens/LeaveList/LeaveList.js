import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './LeaveList.module.scss';
import { AltTableReactTable } from 'screens/App/shared/common/Table';
import { accountTypes, leaveStatuses, leaveTypeSelectOptions } from 'data';
import dayjs from 'dayjs';

class LeaveList extends Component {
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
    const columns = [
      {
        Header: () => <div style={{ textAlign: 'left' }}>Leave ID</div>,
        accessor: 'leaveId',
        id: 'leaveId',
        Cell: ({ row }) => (
          <div className={styles.linkBlue}>
            <Link to={{ pathname: `/dashboard/leave/${row.leaveId}` }}>
              {row.leaveId}
            </Link>
          </div>
        ),
        width: 128
      }
    ];
    if (
      this.props.auth.user.accountType === accountTypes.ADMIN ||
      this.props.auth.user.accountType === accountTypes.OFFICE
    ) {
      columns.push({
        Header: () => <div style={{ textAlign: 'left' }}>Applied by</div>,
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
        Cell: ({ row }) => {
          if (
            this.props.auth.user.accountType === accountTypes.ADMIN ||
            this.props.auth.user.accountType === accountTypes.OFFICE
          ) {
            return dayjs(row.applyDate).format('DD-MMM-YY');
          } else {
            return dayjs(row.applyDate).format('DD-MMM-YYYY hh:mm:ss A');
          }
        },
        width:
          this.props.auth.user.accountType === accountTypes.ADMIN ||
          this.props.auth.user.accountType === accountTypes.OFFICE
            ? 96
            : 208
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>From</div>,
        id: 'from',
        accessor: d => d.dayRange[0],
        Cell: ({ row }) => dayjs(row.from).format('DD-MMM-YYYY'),
        width: 108
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>To</div>,
        id: 'to',
        accessor: d => d.dayRange[d.dayRange.length - 1],
        Cell: ({ row }) => dayjs(row.to).format('DD-MMM-YYYY'),
        width: 108
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Leave type</div>,
        accessor: 'leaveType',
        id: 'leaveType',
        Cell: ({ row }) =>
          leaveTypeSelectOptions.find(x => x.value === row.leaveType).label,
        width: 180
      },
      {
        Header: () => <div style={{ textAlign: 'right' }}>No. of Days</div>,
        accessor: 'noOfDays',
        id: 'noOfDays',
        Cell: ({ row }) => (
          <div style={{ textAlign: 'right' }}>{row.noOfDays}</div>
        ),
        width: 72
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Status</div>,
        accessor: 'status',
        id: 'status',
        Cell: ({ row }) => leaveStatuses[row.status]
      }
    ];
    columns.push(...temp);

    return (
      <AltTableReactTable
        data={this.props.leave.leaveList}
        columns={columns}
        loading={this.state.isLoading}
        defaultSorted={[{ id: 'applyDate', desc: true }]}
      />
    );
  };
}

export default LeaveList;
