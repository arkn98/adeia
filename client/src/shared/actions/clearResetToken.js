import axios from 'axios';

// clear password reset token (usually done when user logs in; or actually uses the reset token)
const clearResetToken = data => dispatch => {
  axios
    .put('api/account/clear-reset-token', data)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export default clearResetToken;
