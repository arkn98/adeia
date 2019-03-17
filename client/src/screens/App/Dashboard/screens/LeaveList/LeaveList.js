import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ReactTable, { ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css';
import {
  ButtonLink,
  ButtonSubmitFullHeight
} from 'screens/App/shared/common/Button';
/* import styles from './LeaveList.module.scss';
import leaveTypes from 'data/leaveTypes'; */
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

  filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
      : true;
  };

  render = () => {
    const columns = [
      {
        Header: 'Leave ID',
        accessor: 'leaveId',
        id: 'leaveId',
        Cell: ({ row }) => (
          <Link to={{ pathname: '/dashboard/leave/view/' + row.leaveId }}>
            <ButtonLink>{row.leaveId}</ButtonLink>
          </Link>
        )
      },
      {
        Header: 'Applied Date',
        accessor: 'applyDate',
        sortable: true,
        Cell: ({ row }) => dayjs(row.applyDate).format('DD-MMM-YYYY')
      },
      {
        id: 'from',
        Header: 'From',
        accessor: 'from',
        Cell: ({ row }) => dayjs(row.from).format('DD-MMM-YYYY')
      },
      {
        id: 'to',
        Header: 'To',
        accessor: 'to',
        Cell: ({ row }) => dayjs(row.to).format('DD-MMM-YYYY')
      },
      {
        Header: 'Leave type',
        accessor: 'leaveType'
      },
      {
        Header: 'No. of Days',
        accessor: 'noOfDays',
        id: 'noOfDays',
        Cell: ({ row }) => row.noOfDays
        /* {/* <div style={{ textAlign: 'right' }}>{row.noOfDays}</div> } */
      },
      {
        Header: 'Status',
        accessor: 'status'
      }
    ];

    return (
      <Fragment>
        <ReactTable
          data={this.props.leave.leaveList}
          columns={columns}
          loading={this.state.isLoading}
          showPageSizeOptions={false}
          defaultPageSize={12}
          resizable={false}
          minRows={12}
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
