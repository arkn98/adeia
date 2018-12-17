import React, { Component } from 'react';
import styles from './Modal.module.css';

class Modal extends Component {
  state = {};

  render() {
    return (
      <div
        className={
          this.props.isDarkTheme
            ? `${styles.modal}`
            : `${styles.modal} ${styles.lightTheme}`
        }>
        <div className={styles.inner}>
          <div
            className={`${styles.modalInner} ${styles.container} ${
              styles.big
            }`}>
            <div className={`${styles.flexItem} ${styles.header}`}>
              <h4 className={styles.title}>About</h4>
              <div
                onClick={this.props.modalDismissHandler}
                className={styles.buttonTransparent}>
                Close
              </div>
            </div>
            <div
              className={`${styles.flexItem} ${styles.body} ${
                styles.scrollWrap
              }`}>
              <div className={`${styles.scroller} ${styles.bodyInner}`}>
                <div className={styles.contentText}>fill in info here...</div>
              </div>
            </div>
            {/* <div className={`${styles.flexItem} ${styles.footer}`}>
              <button
                onClick={this.props.modalDismissHandler}
                className={`${styles.button} ${styles.lookFilled} ${
                  styles.buttonRed
                }`}>
                Log Out
              </button>
              <button
                onClick={this.props.modalDismissHandler}
                className={`${styles.button} ${styles.lookLink}`}>
                <div className={styles.contents}>Cancel</div>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
