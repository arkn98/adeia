import { NEW_NOTIFICATION } from '../actionTypes';

const getNotificationFromSocket = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: NEW_NOTIFICATION, payload: data });
    resolve();
  });
};

export default getNotificationFromSocket;
