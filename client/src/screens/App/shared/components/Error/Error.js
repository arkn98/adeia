import React, { useEffect } from 'react';
import styles from '../../styles/FullPageLanding.module.scss';
import { NotFound, ServerDown } from 'assets/illustrations';
import { ButtonTransparent } from '../../common/Button';
import { withRouter } from 'react-router-dom';
import { Footer } from '../Footer';

const Error = props => {
  const {
    message,
    history,
    children,
    footerAltColors = true,
    showButton = false,
    buttonContent,
    showIllustration = '',
    loadingText = false,
    buttonLocation = '/',
    inDashboard = false,
    updateCurrentRouteTitle = null,
    pageTitle = ''
  } = props;

  useEffect(() => {
    if (updateCurrentRouteTitle !== null) {
      updateCurrentRouteTitle(pageTitle);
    }
  });

  return (
    <div
      className={`${styles.app} ${inDashboard ? styles.forceFullDash : null}`}>
      <div className={styles.banner}>
        {showIllustration === 'not-found' ? (
          <NotFound className={styles.errorIllustration} />
        ) : showIllustration === 'server-down' ? (
          <ServerDown className={styles.errorIllustration} />
        ) : null}
        <div className={`${styles.title} ${styles.titleBig}`}>
          {children}
          {loadingText ? <span className={styles.loadingEllipsis} /> : null}
        </div>
        <div className={styles.text}>{message}</div>
        {showButton ? (
          <div className={styles.buttons}>
            <div>
              <ButtonTransparent
                onClick={() => {
                  buttonLocation === 'back'
                    ? history.goBack()
                    : history.push(buttonLocation);
                }}>
                {buttonContent}
              </ButtonTransparent>
            </div>
          </div>
        ) : null}
      </div>
      <Footer altColors={footerAltColors} />
    </div>
  );
};

export default withRouter(Error);
