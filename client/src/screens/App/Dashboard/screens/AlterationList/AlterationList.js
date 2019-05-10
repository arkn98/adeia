import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './AlterationList.module.scss';
import dayjs from 'dayjs';
import { accountTypes } from 'data';
import { AltTableReactTable } from 'screens/App/shared/common/Table';

class AlterationList extends Component {
  state = {
    isLoading: true
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(this.props.pageTitle);
    this.props.getAlterations().then(res => {
      this.setState({ ...this.state, isLoading: false });
    });
  };

  render = () => {
    const columns = [
      {
        Header: () => <div style={{ textAlign: 'left' }}>Alteration ID</div>,
        accessor: 'alterationId',
        id: 'alterationId',
        Cell: ({ row }) => (
          <div className={styles.linkBlue}>
            <Link
              to={{ pathname: `/dashboard/alteration/${row.alterationId}` }}>
              {row.alterationId}
            </Link>
          </div>
        ),
        width: 128
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Leave ID</div>,
        accessor: 'leaveId',
        sortable: true,
        Cell: ({ row }) => {
          if (
            this.props.auth.user.accountType === accountTypes.ADMIN ||
            this.props.auth.user.accountType === accountTypes.OFFICE
          ) {
            return (
              <div className={styles.linkBlue}>
                <Link to={{ pathname: `/dashboard/leave/${row.leaveId}` }}>
                  {row.leaveId}
                </Link>
              </div>
            );
          } else {
            return row.leaveId;
          }
        },
        width: 128
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Class</div>,
        accessor: 'class',
        id: 'class',
        Cell: ({ row }) => `${row.class.classCode} - ${row.class.nameOfClass}`,
        width: 208
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>From Staff</div>,
        accessor: 'originalStaff',
        id: 'originalStaff',
        Cell: ({ row }) =>
          `${row.originalStaff.staffId} - ${row.originalStaff.name}`,
        width: 208
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Alteration Date</div>,
        accessor: 'alterationDate',
        sortable: true,
        Cell: ({ row }) => dayjs(row.alterationDate).format('DD-MMM-YYYY'),
        width: 128
      },
      {
        Header: () => <div style={{ textAlign: 'right' }}>Alteration Hour</div>,
        id: 'alterationHour',
        accessor: 'alterationHour',
        Cell: ({ row }) => (
          <div style={{ textAlign: 'right' }}>{row.alterationHour}</div>
        ),
        width: 96
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Status</div>,
        id: 'status',
        accessor: 'status',
        Cell: ({ row }) => row.status
      }
    ];

    return (
      <AltTableReactTable
        data={this.props.alterations.alterationList}
        columns={columns}
        loading={this.state.isLoading}
        defaultSorted={[{ id: 'alterationDate', desc: false }]}
      />
    );
  };
}

export default AlterationList;
