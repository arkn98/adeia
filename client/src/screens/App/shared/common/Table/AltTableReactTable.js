import React, { Component } from 'react';
import ReactTable from 'react-table';
import { ButtonSubmitTable } from 'screens/App/shared/common/Button';
import styles from './AltTableReactTable.module.scss';
import 'react-table/react-table.css';
import './TableStyles.css';

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
  console.log(props);
  return (
    <div
      className={`${styles.columnTitle} ${className}`}
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

const MyTBodyComponent = props => {
  return (
    <div {...props} style={{ ...props.style, overflowX: 'visible' }}>
      {props.children}
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
  const { children, hoverable, style, ...rest } = props;
  return (
    <div
      className={`${styles.trGroup} ${hoverable ? styles.hoverable : null}`}
      {...rest}>
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

class AltTableReactTable extends Component {
  state = {};

  render = () => {
    const {
      data,
      columns,
      isLoading,
      minRows = 2,
      setRef,
      showPagination = true,
      defaultSorted,
      onPageChange,
      onPageSizeChange,
      filterable = true,
      containerStyles = null,
      hoverable = true
    } = this.props;
    return (
      <ReactTable
        data={data}
        className={containerStyles}
        TableComponent={MyTableComponent}
        TheadComponent={MyTheadComponent}
        ThComponent={MyThComponent}
        FilterComponent={MyFilterComponent}
        TdComponent={MyTdComponent}
        TrGroupComponent={props => (
          <MyTrGroupComponent hoverable={hoverable} {...props} />
        )}
        TbodyComponent={MyTBodyComponent}
        TrComponent={MyTrComponent}
        PaginationComponent={MyPaginationComponent}
        columns={columns}
        loading={isLoading}
        showPageSizeOptions={true}
        pageSizeOptions={[20, 50, 100]}
        showPagination={showPagination}
        resizable={false}
        minRows={minRows}
        ref={setRef}
        filterable={filterable}
        defaultSorted={defaultSorted}
        defaultSortDesc={true}
        NextComponent={ButtonSubmitTable}
        PreviousComponent={ButtonSubmitTable}
        onPageChange={onPageChange}
        PadRowComponent={<span />}
        onPageSizeChange={onPageSizeChange}
      />
    );
  };
}

export default AltTableReactTable;
