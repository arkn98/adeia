import React, { Fragment } from 'react';
import { MdTrash } from 'assets/icons';
import styles from './Button.module.scss';

const ButtonIcon = props => {
  const {
    isLoading = false,
    onClick,
    index = undefined,
    type = 'delete',
    style = {},
    className = null,
    disabled = false,
    ...rest
  } = props;
  return (
    <Fragment>
      <div
        className={`${styles.iconHoverWrapper} ${
          disabled || isLoading ? styles.disabled : null
        } ${type === 'delete' ? styles.danger : null} ${className}`}
        style={{ ...style }}
        onClick={disabled || isLoading ? null : () => onClick(index)}
        {...rest}>
        {type === 'delete' ? (
          <MdTrash className={styles.customIconTest} />
        ) : null}
      </div>
    </Fragment>
  );
};

export default ButtonIcon;
