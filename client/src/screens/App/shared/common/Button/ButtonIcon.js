import React, { Fragment } from 'react';
import { MdTrash, MdCloseCircle, MdCheckMarkCircle } from 'assets/icons';
import styles from './Button.module.scss';

const ButtonIcon = props => {
  const {
    isLoading = false,
    onClick = null,
    index = undefined,
    type = 'delete',
    style = {},
    className = null,
    disabled = false,
    alt = false,
    ...rest
  } = props;
  return (
    <Fragment>
      <div
        className={`${styles.iconHoverWrapper} ${
          alt ? styles.altButtonIcon : null
        } ${disabled || isLoading ? styles.disabled : null} ${
          type === 'delete' || type === 'cross'
            ? styles.danger
            : type === 'check'
            ? styles.green
            : null
        } ${className}`}
        style={{ ...style }}
        onClick={disabled || isLoading ? null : () => onClick(index)}
        {...rest}>
        {type === 'delete' ? (
          <MdTrash className={styles.customIconTest} />
        ) : type === 'cross' ? (
          <MdCloseCircle className={styles.customIconTest} />
        ) : type === 'check' ? (
          <MdCheckMarkCircle className={styles.customIconTest} />
        ) : null}
      </div>
    </Fragment>
  );
};

export default ButtonIcon;
