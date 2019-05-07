import axios from 'axios';
import { MARK_INDEX_AS_READ_NOTIFICATIONS } from '../actionTypes';

const markIndexAsRead = (index, notificationId) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: MARK_INDEX_AS_READ_NOTIFICATIONS, payload: index });
    console.log(notificationId);
    axios.get('/api/profile/mark-index-as-read', {
      params: {
        id: notificationId
      }
    });
    resolve();
  });
};

export default markIndexAsRead;
