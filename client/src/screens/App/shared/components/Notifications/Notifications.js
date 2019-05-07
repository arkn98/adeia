import React, { Component, Fragment } from 'react';
import styles from './Notifications.module.scss';
import ClickOutside from 'react-click-outside';
import { MdInformationCircleOutline } from 'assets/icons';
import { Link } from 'react-router-dom';

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
    const {
      notifications = [],
      notificationsNew = [],
      markAllAsReadHandler,
      markIndexAsRead
    } = this.props;

    return (
      <ClickOutside onClickOutside={() => this.toggle()}>
        <div
          className={`${styles.dashPopouts} ${styles.notificationsContainer}`}>
          <div className={styles.header}>
            <div className={styles.headerTabWrapper}>
              <div className={styles.title}>Notifications</div>
              {notificationsNew.length !== 0 ? (
                <div
                  onClick={markAllAsReadHandler}
                  className={styles.markAllAsRead}>
                  Mark all as read
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.scrollWrapper}>
            <div className={styles.scroller}>
              {notificationsNew.length !== 0 ? (
                <div className={styles.messageDivider}>
                  <span>NEW</span>
                </div>
              ) : null}
              {notificationsNew.map((notification, index) => {
                return (
                  <Fragment>
                    <Link
                      to={notification.link}
                      onClick={() =>
                        markIndexAsRead(index, notification.notificationId)
                      }>
                      <div className={styles.messageWrapper}>
                        <div className={styles.messageContainer}>
                          <div className={styles.message}>
                            <div className={styles.messageIconWrapper}>
                              {notification.type === 'info' ? (
                                <MdInformationCircleOutline
                                  className={styles.messageIcon}
                                />
                              ) : null}
                            </div>
                            <div className={styles.messageRight}>
                              <div className={styles.messageTitleRow}>
                                <div className={styles.messageTitle}>
                                  {notification.title}
                                </div>
                                <div className={styles.messageTime}>
                                  {notification.time}
                                </div>
                              </div>
                              <div className={styles.messageContent}>
                                {notification.message}
                              </div>
                              <div className={styles.messageTimeMobile}>
                                {notification.time}
                              </div>
                            </div>
                          </div>
                          <div className={styles.actionButtons}>
                            <div className={styles.jumpButton}>
                              <div>Go there</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Fragment>
                );
              })}
              {notifications.length !== 0 ? (
                <div className={styles.messageDivider}>
                  <span>EARLIER</span>
                </div>
              ) : null}
              {notifications.map((notification, index) => {
                return (
                  <Fragment>
                    <Link to={notification.link}>
                      <div className={styles.messageWrapper}>
                        <div className={styles.messageContainer}>
                          <div className={styles.message}>
                            <div className={styles.messageIconWrapper}>
                              {notification.type === 'info' ? (
                                <MdInformationCircleOutline
                                  className={styles.messageIcon}
                                />
                              ) : null}
                            </div>
                            <div className={styles.messageRight}>
                              <div className={styles.messageTitleRow}>
                                <div className={styles.messageTitle}>
                                  {notification.title}
                                </div>
                                <div className={styles.messageTime}>
                                  {notification.time}
                                </div>
                              </div>
                              <div className={styles.messageContent}>
                                {notification.message}
                              </div>
                              <div className={styles.messageTimeMobile}>
                                {notification.time}
                              </div>
                            </div>
                          </div>
                          <div className={styles.actionButtons}>
                            <div className={styles.jumpButton}>
                              <div>Go there</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Fragment>
                );
              })}
              {notifications.length === 0 && notificationsNew.length === 0 ? (
                <div className={styles.emptyState}>There's nothing in here</div>
              ) : null}
            </div>
            <Link to="/dashboard/notifications">
              <div className={styles.viewAll}>View all</div>
            </Link>
          </div>
        </div>
      </ClickOutside>
    );
  };
}

export default Notifications;
