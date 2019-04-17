import axios from 'axios';
import moment from 'moment';

moment().local();

// parse UA of client & add corresponding success/failure entry in their profile
const setLoginAttempts = (email, status) => dispatch => {
  axios
    .get('/api/users/getclientdetails')
    .then(res => {
      if (res.data) {
        let newObj = {
          email: email,
          attemptStatus: status,
          timestamp: moment().unix(),
          ip: res.data.ip,
          browser: res.data.browser,
          browserVersion: res.data.browserVersion,
          os: res.data.os,
          osVersion: res.data.osVersion
        };
        axios
          .post('/api/users/set-login-attempts', newObj)
          .then(data => {})
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

export default setLoginAttempts;
