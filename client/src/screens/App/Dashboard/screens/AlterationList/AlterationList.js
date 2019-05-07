import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactTable, { ReactTableDefaults } from 'react-table';
import styles from './AlterationList.module.scss';
import 'react-table/react-table.css';
import { ButtonSubmitTable } from 'screens/App/shared/common/Button';
import './TableStyles.css';
import dayjs from 'dayjs';
import { accountTypes } from 'data';

const MyTableComponent = props => {
  const { children, className, style, ...rest } = props;
  return (
    <div className={styles.table} {...rest} style={style}>
      {children}
    </div>
  );
};

const MyTheadComponent = props => {
  const { children, className, style, ...rest } = props;
  return (
    <div className={styles.thead} style={style} {...rest}>
      {children}
    </div>
  );
};

const MyThComponent = props => {
  const { toggleSort, sorted, className, children, style, ...rest } = props;
  return (
    <div
      className={styles.columnTitle}
      onClick={e => toggleSort && toggleSort(e)}
      style={style}
      {...rest}>
      {children}
    </div>
  );
};

const MyTdComponent = props => {
  const { children, className, style, onClick, ...rest } = props;
  return (
    <div className={styles.columnData} style={style} {...rest}>
      {children}
    </div>
  );
};

const MyTrComponent = props => {
  const { children, className, style, ...rest } = props;
  return (
    <div className={styles.headerRow} {...rest} style={style}>
      {children}
    </div>
  );
};

const MyTrGroupComponent = props => {
  const { children, style, ...rest } = props;
  return (
    <div className={styles.trGroup} {...rest}>
      {children}
    </div>
  );
};

const defaultButton = props => (
  <button type="button" {...props} className="-btn">
    {props.children}
  </button>
);

class MyPaginationComponent extends Component {
  static defaultProps = {
    PreviousComponent: defaultButton,
    NextComponent: defaultButton,
    renderPageJump: ({
      onChange,
      value,
      onBlur,
      onKeyPress,
      inputType,
      pageJumpText
    }) => (
      <div className={styles.centerPageInfo}>
        <input
          aria-label={pageJumpText}
          type={inputType}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
          className={`${styles.columnFilter} ${styles.pageInfoText}`}
          style={{ width: '48px', minHeight: '32px' }}
        />
      </div>
    ),
    renderCurrentPage: page => <span className="-currentPage">{page + 1}</span>,
    renderTotalPagesCount: pages => (
      <span className="-totalPages">{pages || 1}</span>
    ),
    renderPageSizeOptions: ({
      pageSize,
      pageSizeOptions,
      rowsSelectorText,
      onPageSizeChange,
      rowsText
    }) => (
      <span className="select-wrap -pageSizeOptions">
        <select
          aria-label={rowsSelectorText}
          onChange={e => onPageSizeChange(Number(e.target.value))}
          value={pageSize}>
          {pageSizeOptions.map((option, i) => (
            <option key={i} value={option}>
              {`${option} ${rowsText}`}
            </option>
          ))}
        </select>
      </span>
    )
  };

  constructor(props) {
    super(props);

    this.getSafePage = this.getSafePage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.applyPage = this.applyPage.bind(this);

    this.state = {
      page: props.page
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      this.setState({ page: nextProps.page });
    }
  }

  getSafePage(page) {
    if (Number.isNaN(page)) {
      page = this.props.page;
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1);
  }

  changePage(page) {
    page = this.getSafePage(page);
    this.setState({ page });
    if (this.props.page !== page) {
      this.props.onPageChange(page);
    }
  }

  applyPage(e) {
    if (e) {
      e.preventDefault();
    }
    const page = this.state.page;
    this.changePage(page === '' ? this.props.page : page);
  }

  getPageJumpProperties() {
    return {
      onKeyPress: e => {
        if (e.which === 13 || e.keyCode === 13) {
          this.applyPage();
        }
      },
      onBlur: this.applyPage,
      value: this.state.page === '' ? '' : this.state.page + 1,
      onChange: e => {
        const val = e.target.value;
        const page = val - 1;
        if (val === '') {
          return this.setState({ page: val });
        }
        this.setState({ page: this.getSafePage(page) });
      },
      inputType: this.state.page === '' ? 'text' : 'number',
      pageJumpText: this.props.pageJumpText
    };
  }

  render() {
    const {
      pages,
      page,
      showPageSizeOptions,
      pageSizeOptions,
      pageSize,
      showPageJump,
      canPrevious,
      canNext,
      onPageSizeChange,
      className,
      PreviousComponent,
      NextComponent,
      renderPageJump,
      renderCurrentPage,
      renderTotalPagesCount,
      renderPageSizeOptions
    } = this.props;

    return (
      <div className={styles.pagination} style={this.props.style}>
        <div className="-previous">
          <PreviousComponent
            onClick={() => {
              if (!canPrevious) return;
              this.changePage(page - 1);
            }}
            disabled={!canPrevious}
            className={styles.fullWidthMobile}>
            {this.props.previousText}
          </PreviousComponent>
        </div>
        <div className={styles.centerPageJump}>
          <span className={styles.centerPageInfo}>
            {this.props.pageText}{' '}
            {showPageJump
              ? renderPageJump(this.getPageJumpProperties())
              : renderCurrentPage(page)}{' '}
            {this.props.ofText} {renderTotalPagesCount(pages)}
          </span>
          {showPageSizeOptions &&
            renderPageSizeOptions({
              pageSize,
              rowsSelectorText: this.props.rowsSelectorText,
              pageSizeOptions,
              onPageSizeChange,
              rowsText: this.props.rowsText
            })}
        </div>
        <div className="-next">
          <NextComponent
            onClick={() => {
              if (!canNext) return;
              this.changePage(page + 1);
            }}
            disabled={!canNext}
            className={styles.fullWidthMobile}>
            {this.props.nextText}
          </NextComponent>
        </div>
      </div>
    );
  }
}

const MyFilterComponent = ({ filter, onChange }) => {
  return (
    <input
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : ''}
      className={styles.columnFilter}
    />
  );
};

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
          <Link to={{ pathname: `/dashboard/alteration/${row.alterationId}` }}>
            <div className={styles.linkBlue}>{row.alterationId}</div>
          </Link>
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
              <Link to={{ pathname: `/dashboard/leave/${row.leaveId}` }}>
                <div className={styles.linkBlue}>{row.leaveId}</div>
              </Link>
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
      <Fragment>
        <ReactTable
          data={this.props.alterations.alterationList}
          TableComponent={MyTableComponent}
          TheadComponent={MyTheadComponent}
          ThComponent={MyThComponent}
          FilterComponent={MyFilterComponent}
          TdComponent={MyTdComponent}
          TrGroupComponent={MyTrGroupComponent}
          TrComponent={MyTrComponent}
          PaginationComponent={MyPaginationComponent}
          columns={columns}
          loading={this.state.isLoading}
          showPageSizeOptions={true}
          pageSizeOptions={[20, 50, 100]}
          resizable={false}
          minRows={2}
          filterable={true}
          defaultSorted={[{ id: 'applyDate', desc: true }]}
          defaultSortDesc={true}
          NextComponent={ButtonSubmitTable}
          PreviousComponent={ButtonSubmitTable}
          PadRowComponent={<span />}
        />
      </Fragment>
    );
  };
}

export default AlterationList;
