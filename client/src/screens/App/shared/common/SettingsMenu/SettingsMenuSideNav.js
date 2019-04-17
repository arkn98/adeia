import React, { Fragment } from 'react';
import styles from './SettingsMenu.module.scss';
import { Link } from 'react-router-dom';
import { MdBuild, MdMoon, MdCloseCircle, MdSunny } from 'assets/icons';

const SettingsMenuSideNav = ({
  isDarkTheme,
  isSettingsMenuVisible,
  themeChangeHandler,
  logoutHandler,
  settingsMenuHide
}) => {
  return (
    <div
      className={`${styles.popouts} ${styles.popout} ${styles.settingsMenu} ${
        isSettingsMenuVisible ? styles.settingsMenuVisible : null
      }`}>
      <div className={styles.item} onClick={themeChangeHandler}>
        {isDarkTheme ? (
          <Fragment>
            <MdSunny className={styles.menuIconTest} />
            Switch to Light theme
          </Fragment>
        ) : (
          <Fragment>
            <MdMoon className={styles.menuIconTest} />
            Switch to Dark Theme
          </Fragment>
        )}
      </div>
      <Link
        to="/dashboard/settings"
        className={styles.item}
        onClick={settingsMenuHide}>
        <MdBuild className={styles.menuIconTest} />
        Account Settings
      </Link>
      <div className={styles.seperator} />
      <div
        onClick={logoutHandler}
        className={`${styles.item} ${styles.danger}`}>
        <MdCloseCircle className={styles.menuIconTest} />
        Logout
      </div>
    </div>
  );
};

export default SettingsMenuSideNav;
