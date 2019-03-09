import { SET_CURRENT_USER } from '../actionTypes';

//set logged in user
const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export default setCurrentUser;
