import React from 'react';
import styles from '../../styles/FullPageLanding.module.scss';
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
    loadingText = false,
    buttonLocation = '/'
  } = props;
  return (
    <div className={styles.app}>
      <div className={styles.banner}>
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
