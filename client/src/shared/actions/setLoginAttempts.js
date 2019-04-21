import axios from 'axios';

// parse UA of client & add corresponding success/failure entry in their profile
const setLoginAttempts = (email, status) => dispatch => {
  axios
    .post('/api/profile/set-login-attempts', {
      email: email,
      attemptStatus: status
    })
    .then(data => {})
    .catch(err => console.log(err));
};

export default setLoginAttempts;
