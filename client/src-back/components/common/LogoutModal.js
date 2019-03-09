import React, { Component } from 'react';
import styles from './Modal.module.css';

class Modal extends Component {
  state = {};

  render() {
    return (
      <div className={styles.modal} ref={this.props.myRef}>
        <div className={styles.inner}>
          <div
            className={`${styles.modalInner} ${styles.container} ${
              styles.small
            }`}>
            <div className={`${styles.flexItem} ${styles.header}`}>
              <h4 className={styles.title}>Log Out</h4>
            </div>
            <div
              className={`${styles.flexItem} ${styles.body} ${
                styles.scrollWrap
              }`}>
              <div className={`${styles.scroller} ${styles.bodyInner}`}>
                <div className={styles.contentText}>
                  Are you sure you want to log out?
                </div>
              </div>
            </div>
            <div className={`${styles.flexItem} ${styles.footer}`}>
              <button
                onClick={this.props.modalConfirmHandler}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
