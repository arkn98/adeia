import axios from 'axios';
import { MARK_ALL_AS_READ_NOTIFICATIONS } from '../actionTypes';

const markAllAsRead = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: MARK_ALL_AS_READ_NOTIFICATIONS });
    axios.get('/api/profile/mark-all-as-read');
    resolve();
    /* .then(() => {
        dispatch(getCurrentProfile());
        resolve();
      })
      .catch(err => {
        console.log(err);
        reject();
      }); */
  });
};

export default markAllAsRead;
