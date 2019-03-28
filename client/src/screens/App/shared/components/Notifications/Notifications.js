import React, { Component } from 'react';
import styles from './Notifications.module.scss';
import ClickOutside from 'react-click-outside';

class Notifications extends Component {
  state = {
    transitionEnd: false
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        ...this.state,
        transitionEnd: true
      });
    }, 0);
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
    return (
      <ClickOutside onClickOutside={() => this.toggle()}>
        <div
          className={`${styles.dashPopouts} ${styles.notificationsContainer}`}>
          abcd
        </div>
      </ClickOutside>
    );
  };
}

export default Notifications;
