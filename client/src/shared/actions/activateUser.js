import axios from 'axios';
import { GET_ERRORS } from '../actionTypes';

// Activate user
const activateUser = (userData, profileData, history) => dispatch => {
  axios
    .post('/api/users/activate', userData)
    .then(res => {
      history.push('/login');
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export default activateUser;
