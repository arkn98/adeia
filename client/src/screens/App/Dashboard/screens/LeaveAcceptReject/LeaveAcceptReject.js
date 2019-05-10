import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './LeaveAcceptReject.module.scss';
import { AltTableReactTable } from 'screens/App/shared/common/Table';
import {
  ButtonSubmit /* , ButtonIcon  */
} from 'screens/App/shared/common/Button';
import { staffTypes, leaveStatuses } from 'data';
import { TopFilter } from 'screens/App/shared/common/TopFilter';
import { WidthLimiter } from 'screens/App/shared/common/FormInput';
import dayjs from 'dayjs';

class LeaveAcceptReject extends Component {
  state = {
    isLoading: true,
    leaves: [],
    selected: {},
    selectAll: 0,
    isRowSubmitting: false,
    isSubmitting: false
  };

  filterChangeHandler = val => {
    this.props.acceptRejectFilterHandler(val);
  };

  componentDidMount = () => {
    this.setFilter();
    this.props
      .getLeaves({ status: leaveStatuses.WAITINGHODAPPROVAL })
      .then(res => {
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
      this.setState({
        ...this.state,
        leaves: newLeaves,
        selected: {},
        selectAll: 0
      });
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

  selectToggleRow = leaveId => {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[leaveId] = !this.state.selected[leaveId];
    this.setState({
      ...this.state,
      selected: newSelected,
      selectAll: Object.values(newSelected).every(x => !x) ? 0 : 2
    });
  };

  onPageChange = pageIndex => {
    this.setState({ ...this.state, selected: {}, selectAll: 0 });
  };

  onPageSizeChange = (pageSize, pageIndex) => {
    this.setState({ ...this.state, selected: {}, selectAll: 0 });
  };

  selectToggleAll = () => {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      const { page, pageSize, sortedData } = this.reactTable.getResolvedState();
      const x = page * pageSize;
      sortedData.slice(x, x + pageSize).forEach(x => {
        newSelected[x._original.leaveId] = true;
      });
    }

    this.setState({
      ...this.state,
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  };

  acceptRowHandler = (event, leaveId) => {
    event.preventDefault();
    if (
      !window.confirm(
        'Warning! This cannot be undone. Do you want to continue?'
      )
    ) {
      return;
    }
    this.props.leaveAcceptRejectHOD([leaveId], 'ACCEPT').then(() => {
      this.props
        .getLeaves({ status: leaveStatuses.WAITINGHODAPPROVAL })
        .then(res => {
          let newLeaves = this.props.leave.leaveList.filter(x =>
            this.props.acceptRejectFilter.includes(x.staff.staffType)
          );
          this.setState(
            {
              ...this.state,
              leaves: newLeaves,
              selected: {},
              selectAll: 0
            },
            () => {
              this.props.showPopout({
                type: 'modalSingleButton',
                title: 'Action successful',
                message: 'Leaves successfully accepted.',
                buttonPrimary: true,
                buttonContent: 'Okay'
              });
            }
          );
        });
    });
  };

  rejectRowHandler = (event, leaveId) => {
    event.preventDefault();
    if (
      !window.confirm(
        'Warning! This cannot be undone. Do you want to continue?'
      )
    ) {
      return;
    }
    this.props.leaveAcceptRejectHOD([leaveId], 'REJECT').then(() => {
      this.props
        .getLeaves({ status: leaveStatuses.WAITINGHODAPPROVAL })
        .then(res => {
          let newLeaves = this.props.leave.leaveList.filter(x =>
            this.props.acceptRejectFilter.includes(x.staff.staffType)
          );
          this.setState(
            {
              ...this.state,
              leaves: newLeaves,
              selected: {},
              selectAll: 0
            },
            () => {
              this.props.showPopout({
                type: 'modalSingleButton',
                title: 'Action successful',
                message: 'Leaves successfully rejected.',
                buttonPrimary: true,
                buttonContent: 'Okay'
              });
            }
          );
        });
    });
  };

  acceptSelectedHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });
    if (
      !window.confirm(
        'Warning! This cannot be undone. Do you want to continue?'
      )
    ) {
      return;
    }
    let toSend = [];
    for (var x in this.state.selected) {
      if (this.state.selected[x]) toSend.push(x);
    }
    this.props.leaveAcceptRejectHOD(toSend, 'ACCEPT').then(() => {
      this.props
        .getLeaves({ status: leaveStatuses.WAITINGHODAPPROVAL })
        .then(res => {
          let newLeaves = this.props.leave.leaveList.filter(x =>
            this.props.acceptRejectFilter.includes(x.staff.staffType)
          );
          this.setState(
            {
              ...this.state,
              leaves: newLeaves,
              selected: {},
              selectAll: 0
            },
            () => {
              this.props.showPopout({
                type: 'modalSingleButton',
                title: 'Action successful',
                message: 'Leaves successfully accepted.',
                buttonPrimary: true,
                buttonContent: 'Okay'
              });
            }
          );
        });
    });
  };

  rejectSelectedHandler = event => {
    event.preventDefault();
    this.setState({ ...this.state, isSubmitting: true });
    if (
      !window.confirm(
        'Warning! This cannot be undone. Do you want to continue?'
      )
    ) {
      return;
    }
    let toSend = [];
    for (var x in this.state.selected) {
      if (this.state.selected[x]) toSend.push(x);
    }
    this.props.leaveAcceptRejectHOD(toSend, 'REJECT').then(() => {
      this.props
        .getLeaves({ status: leaveStatuses.WAITINGHODAPPROVAL })
        .then(res => {
          let newLeaves = this.props.leave.leaveList.filter(x =>
            this.props.acceptRejectFilter.includes(x.staff.staffType)
          );
          this.setState(
            {
              ...this.state,
              leaves: newLeaves,
              selected: {},
              selectAll: 0
            },
            () => {
              this.props.showPopout({
                type: 'modalSingleButton',
                title: 'Action successful',
                message: 'Leaves successfully rejected.',
                buttonPrimary: true,
                buttonContent: 'Okay'
              });
            }
          );
        });
    });
  };

  render = () => {
    const columns = [
      {
        Header: x => {
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <input
                type="checkbox"
                className="checkbox"
                checked={this.state.selectAll === 1}
                ref={input => {
                  if (input) {
                    input.indeterminate = this.state.selectAll === 2;
                  }
                }}
                onChange={() => this.selectToggleAll()}
              />
            </div>
          );
        },
        Cell: props => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={
                props.show &&
                this.state.selected[props.original.leaveId] === true
              }
              onChange={() => this.selectToggleRow(props.original.leaveId)}
            />
          );
        },
        width: 48,
        sortable: false
      },
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
      },
      {
        Header: () => <div style={{ textAlign: 'left' }}>Applied Date</div>,
        id: 'staff',
        sortable: true,
        Cell: props => {
          /* console.log(props); */
          return props.original.staff.name;
        },
        width: 162
      },
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
      },
      {
        Header: () => <div>Action</div>,
        Cell: props => (
          <div style={{ display: 'flex' }}>
            {/* <ButtonIcon
              alt={true}
              isLoading={this.state.isUpdateSubmittingPublic}
              /* index={index} **
              type="check"
              style={{ marginRight: '4px' }}
              /* onClick={this.publicHolidayDeleteHandler} **
              /> */}
            <ButtonSubmit
              onClick={this.acceptRowHandler}
              indexBasedOnClick={true}
              index={props.original.leaveId}
              sizeSmall={true}
              fitText={true}
              style={{ marginRight: '8px' }}
              isLoading={this.state.isRowSubmitting}>
              Accept
            </ButtonSubmit>
            <ButtonSubmit
              onClick={this.rejectRowHandler}
              indexBasedOnClick={true}
              index={props.original.leaveId}
              sizeSmall={true}
              fitText={true}
              type="danger"
              isLoading={this.state.isRowSubmitting}>
              Reject
            </ButtonSubmit>
          </div>
        ),
        width: 72,
        sortable: false
      }
    ];

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
          setRef={element => {
            this.reactTable = element;
          }}
          data={this.state.leaves}
          filterable={false}
          hoverable={false}
          containerStyles={styles.marginBottom20}
          columns={columns}
          loading={this.state.isLoading}
          defaultSorted={[{ id: 'applyDate', desc: true }]}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
        />
        {Object.values(this.state.selected).some(x => x === true) ? (
          <WidthLimiter>
            <div style={{ display: 'flex' }} className={styles.marginBottom20}>
              <ButtonSubmit
                onClick={this.acceptSelectedHandler}
                sizeSmall={true}
                style={{ marginRight: '8px' }}
                isLoading={this.state.isSubmitting}>
                Accept all selected
              </ButtonSubmit>
              <ButtonSubmit
                onClick={this.rejectSelectedHandler}
                sizeSmall={true}
                type="danger"
                isLoading={this.state.isSubmitting}>
                Reject all selected
              </ButtonSubmit>
            </div>
          </WidthLimiter>
        ) : null}
      </Fragment>
    );
  };
}

export default LeaveAcceptReject;
