import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowDropright } from 'assets/icons';
import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = props => {
  const { levels = [], current = '' } = props;
  return (
    <div className={styles.breadcrumbWrapper}>
      {levels.map(item => {
        return (
          <Fragment>
            <div className={styles.breadcrumb}>
              <Link to={item.to}>{item.title}</Link>
            </div>
            <MdArrowDropright className={styles.breadcrumbArrow} />
          </Fragment>
        );
      })}
      <div>{current}</div>
    </div>
  );
};

export default Breadcrumbs;
