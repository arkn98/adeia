import React, { Fragment, Component } from 'react';
import styles from './Modal.module.scss';
import { ButtonModalPrimary } from '../Button';

class ModalSingleButton extends Component {
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
      buttonPrimary = true,
      buttonContent,
      buttonDanger = false,
      buttonLink = false
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
                  <div
                    className={styles.contentText}
                    dangerouslySetInnerHTML={{ __html: message }}
                  />
                </div>
              </div>
              <div className={`${styles.flexItem} ${styles.footer}`}>
                {buttonPrimary ? (
                  <ButtonModalPrimary
                    setRef={this.setRef}
                    onClick={this.modalConfirmHandler}>
                    {buttonContent}
                  </ButtonModalPrimary>
                ) : null}
                {buttonDanger ? (
                  <button
                    ref={input => {
                      this.button = input;
                    }}
                    onClick={this.modalConfirmHandler}
                    className={`${styles.button} ${styles.lookFilled} ${
                      styles.buttonRed
                    }`}>
                    {buttonContent}
                  </button>
                ) : null}
                {buttonLink ? (
                  <button
                    ref={input => {
                      this.button = input;
                    }}
                    onClick={this.modalConfirmHandler}
                    className={`${styles.button} ${styles.lookLink}`}>
                    <div className={styles.contents}>Cancel</div>
                    {buttonContent}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
}

export default ModalSingleButton;
