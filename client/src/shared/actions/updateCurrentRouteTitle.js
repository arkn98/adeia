import { SET_CURRENT_PAGE_TITLE } from '../actionTypes';

const updateCurrentRouteTitle = data => {
  return {
    type: SET_CURRENT_PAGE_TITLE,
    payload: data
  };
};

export default updateCurrentRouteTitle;
