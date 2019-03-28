import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ReactTable, { ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css';
import { ButtonSubmitFullHeight } from 'screens/App/shared/common/Button';
import leaveTypes from 'data/leaveTypes';
import './TableStyles.css';
import leaveStatus from 'data/leaveStatus';
import dayjs from 'dayjs';

const MyTrComponent = props => {
  const { children, className, style, ...rest } = props;
  return (
    <div className={'rt-tr ' + className} {...rest}>
      {children}
    </div>
  );
};

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

  filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
      : true;
  };

  render = () => {
    const columns = [
      {
        Header: () => <div style={{ textAlign: 'left' }}>Leave ID</div>,
        accessor: 'leaveId',
        id: 'leaveId',
        width: 96
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Applied Date</div>,
        accessor: 'applyDate',
        sortable: true,
        Cell: ({ row }) => dayjs(row.applyDate).format('DD-MMM-YYYY'),
        width: 128
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>From</div>,
        id: 'from',
        accessor: 'from',
        Cell: ({ row }) => dayjs(row.from).format('DD-MMM-YYYY'),
        width: 128
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>To</div>,
        id: 'to',
        accessor: 'to',
        Cell: ({ row }) => dayjs(row.to).format('DD-MMM-YYYY'),
        width: 128
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Leave type</div>,
        accessor: 'leaveType',
        id: 'leaveType',
        Cell: ({ row }) =>
          leaveTypes.leaveTypes.find(x => x.value === row.leaveType).label
      },
      {
        Header: () => <div style={{ textAlign: 'right' }}>No. of Days</div>,
        accessor: 'noOfDays',
        id: 'noOfDays',
        Cell: ({ row }) => (
          <div style={{ textAlign: 'right' }}>{row.noOfDays}</div>
        ),
        width: 80
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Reason</div>,
        accessor: 'reason',
        id: 'reason',
        Cell: ({ row }) => <div style={{ textAlign: 'left' }}>{row.reason}</div>
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Status</div>,
        accessor: 'status',
        id: 'status',
        Cell: ({ row }) =>
          leaveStatus.statuses.find(x => parseInt(x.code) === row.status).name
      }
    ];

    return (
      <Fragment>
        <ReactTable
          data={this.props.leave.leaveList}
          TrComponent={MyTrComponent}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                this.props.history.push(
                  `/dashboard/leave/view/${rowInfo.row.leaveId}`
                );
                /* if (handleOriginal) {
                  handleOriginal();
                } */
              }
            };
          }}
          columns={columns}
          loading={this.state.isLoading}
          showPageSizeOptions={false}
          defaultPageSize={15}
          resizable={false}
          minRows={15}
          filterable={true}
          defaultFilterMethod={this.filterMethod}
          defaultSorted={[{ id: 'applyDate', desc: true }]}
          defaultSortDesc={true}
          NextComponent={ButtonSubmitFullHeight}
          PreviousComponent={ButtonSubmitFullHeight}
        />
      </Fragment>
    );
  };
}

export default withRouter(LeaveList);
