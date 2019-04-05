import React, { Fragment, Component } from 'react';
import styles from './Modal.module.scss';
import { ButtonModalPrimary } from '../Button';

class ModalDoubleButton extends Component {
  state = {
    transitionEnd: false
  };

  componentDidMount = () => {
    if (typeof this.button !== 'undefined')
      setTimeout(() => {
        this.button.focus();
      }, 100);
    setTimeout(() => {
      this.setState({
        ...this.state,
        transitionEnd: true
      });
    }, 0);
  };

  setRef = element => {
    this.button = element;
  };

  modalConfirmHandler = event => {
    event.preventDefault();
    this.toggle();
  };

  action1 = event => {
    event.preventDefault();
    this.props.action1();
    this.props.hidePopout();
  };

  action2 = event => {
    event.preventDefault();
    this.props.action2();
    this.props.hidePopout();
  };

  toggle = () => {
    this.setState({ ...this.state, transitionEnd: false }, () => {
      setTimeout(() => {
        this.props.hidePopout();
      }, 100);
    });
  };

  render = () => {
    const {
      title,
      message,
      buttonOrder = [],
      buttonContent = [],
      buttonAction = []
    } = this.props;

    return (
      <Fragment>
        <div
          onClick={this.toggle}
          className={`${styles.modalBg} ${
            this.state.transitionEnd ? styles.transitionEnd : null
          }`}
        />
        <div
          className={`${styles.modal} ${
            this.state.transitionEnd ? styles.transitionEnd : null
          }`}>
          <div className={styles.inner}>
            <div
              className={`${styles.modalInner} ${styles.container} ${
                styles.small
              }`}>
              <div className={`${styles.flexItem} ${styles.header}`}>
                <h4 className={styles.title}>{title}</h4>
              </div>
              <div
                className={`${styles.flexItem} ${styles.body} ${
                  styles.scrollWrap
                }`}>
                <div className={`${styles.scroller} ${styles.bodyInner}`}>
                  <div className={styles.contentText}>{message}</div>
                </div>
              </div>
              <div className={`${styles.flexItem} ${styles.footer}`}>
                {buttonOrder.map((item, index) => {
                  if (item === 'primary') {
                    return (
                      <ButtonModalPrimary
                        tabIndex={1}
                        setRef={this.setRef}
                        key={index}
                        onClick={
                          buttonAction[index] === 'dismiss'
                            ? this.modalConfirmHandler
                            : buttonAction[index] === 'action1'
                            ? this.action1
                            : buttonAction[index] === 'action2'
                            ? this.action2
                            : null
                        }>
                        {buttonContent[index]}
                      </ButtonModalPrimary>
                    );
                  } else if (item === 'danger') {
                    return (
                      <button
                        key={index}
                        tabIndex={2}
                        onClick={
                          buttonAction[index] === 'dismiss'
                            ? this.modalConfirmHandler
                            : buttonAction[index] === 'action1'
                            ? this.action1
                            : buttonAction[index] === 'action2'
                            ? this.action2
                            : null
                        }
                        className={`${styles.button} ${styles.lookFilled} ${
                          styles.buttonRed
                        }`}>
                        {buttonContent[index]}
                      </button>
                    );
                  } else if (item === 'white') {
                    return (
                      <button
                        key={index}
                        tabIndex={1}
                        ref={input => {
                          this.button = input;
                        }}
                        onClick={
                          buttonAction[index] === 'dismiss'
                            ? this.modalConfirmHandler
                            : buttonAction[index] === 'action1'
                            ? this.action1
                            : buttonAction[index] === 'action2'
                            ? this.action2
                            : null
                        }
                        className={`${styles.button} ${styles.lookLink}`}>
                        {/* <div className={styles.contents}>Cancel</div> */}
                        {buttonContent[index]}
                      </button>
                    );
                  } else if (item === 'link') {
                    return (
                      <button
                        key={index}
                        tabIndex={1}
                        ref={input => {
                          this.button = input;
                        }}
                        onClick={
                          buttonAction[index] === 'dismiss'
                            ? this.modalConfirmHandler
                            : buttonAction[index] === 'action1'
                            ? this.action1
                            : buttonAction[index] === 'action2'
                            ? this.action2
                            : null
                        }
                        className={`${styles.button} ${styles.lookLink}`}>
                        <div className={styles.contents}>
                          {buttonContent[index]}
                        </div>
                      </button>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
}

export default ModalDoubleButton;
