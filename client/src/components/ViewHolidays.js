import React, { Component } from 'react';
import mainStyles from './Main.module.css';
//import { Link, NavLink } from 'react-router-dom';

class ViewHolidays extends Component {
  render() {
    return (
      <div className={mainStyles.scrollWrapper}>
        <div className={mainStyles.contentWrapper}>
          <div className={mainStyles.body}>
            <div
              className={`${mainStyles.formWrapper} ${mainStyles.marginTop20}`}>
              abcd
            </div>
            {/* <div className={mainStyles.marginTop20}>
                <div className={mainStyles.welcomeMessage}>Apply for leaves</div>
                <div className={mainStyles.boxContainer}>
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-chatbubbles ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>CPL Credits</div>
                      <div className={mainStyles.subtitle}>
                        Check available CPL credits
                      </div>
                    </div>
                  </div>
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-today ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>Leave Status</div>
                      <div className={mainStyles.subtitle}>
                        Check status of applied leaves
                      </div>
                    </div>
                  </div>{' '}
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-stopwatch ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>Awaiting Alterations</div>
                      <div className={mainStyles.subtitle}>
                        Check the alternations given to you
                      </div>
                    </div>
                  </div>{' '}
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-repeat ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>Compensations</div>
                      <div className={mainStyles.subtitle}>
                        Check the list of compensations
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${mainStyles.boxContainer} ${mainStyles.mainFuncs}`}>
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>Leave Availability</div>
                    </div>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-repeat ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                  </div>
                  <div className={mainStyles.box}>
                    <div className={mainStyles.boxText}>
                      <div className={mainStyles.title}>Recent Logins</div>
                    </div>
                    <div className={mainStyles.boxIcon}>
                      <i
                        className={`icon ion-md-repeat ${
                          mainStyles.customHeaderIcon
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            */}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewHolidays;
