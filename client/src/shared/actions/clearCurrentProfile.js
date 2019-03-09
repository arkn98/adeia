import { CLEAR_CURRENT_PROFILE } from '../actionTypes';

//clear profile
const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export default clearCurrentProfile;
