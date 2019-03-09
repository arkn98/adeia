import React, { Component } from 'react';
import styles from './components/Home.module.css';
import { withRouter } from 'react-router-dom';
import Footer from './components/common/Footer';

class PageNotFound extends Component {
  componentDidMount = () => {
    const element = document.getElementById('spinnerContainer');
    if (element) {
      element.outerHTML = '';
    }
  };

  render = () => {
    const isDarkTheme = this.props.isDarkTheme;
    return (
      <div
        style={{ height: '100%' }}
        className={
          isDarkTheme ? `${styles.app}` : `${styles.app} ${styles.lightTheme}`
        }>
        <div className={styles.banner}>
          <div
            className={styles.title}
            style={{
              fontWeight: '800',
              fontSize: '60px',
              paddingBottom: '12px'
            }}>
            404
          </div>
          <div className={styles.text}>
            We can't find the page that you're looking for :(
          </div>
          <div className={styles.buttons}>
            <div
              onClick={() => {
                this.props.history.goBack();
              }}>
              <div
                style={{ flex: '1 1 auto' }}
                className={styles.buttonTransparent}>
                Go back
              </div>
            </div>
          </div>
        </div>
        <Footer altStyle={true} />
      </div>
    );
  };
}

PageNotFound.defaultProps = {
  isDarkTheme: false
};

export default withRouter(PageNotFound);
