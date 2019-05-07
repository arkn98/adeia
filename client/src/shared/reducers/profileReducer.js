import {
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  NEW_NOTIFICATION,
  MARK_ALL_AS_READ_NOTIFICATIONS,
  MARK_INDEX_AS_READ_NOTIFICATIONS
} from '../actionTypes';

const initialState = {
  profile: {
    notifications: []
  },
  isLoaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
        isLoaded: true
      };
    }
    case MARK_INDEX_AS_READ_NOTIFICATIONS: {
      let notificationsCopy = state.profile.notifications.map(item => item);
      notificationsCopy[action.payload] = {
        ...notificationsCopy[action.payload],
        isNew: false
      };
      return {
        ...state,
        profile: {
          ...state.profile,
          notifications: notificationsCopy
        }
      };
    }
    case MARK_ALL_AS_READ_NOTIFICATIONS: {
      let notificationsCopy = state.profile.notifications.map(item => ({
        ...item,
        isNew: false
      }));
      return {
        ...state,
        profile: {
          ...state.profile,
          notifications: notificationsCopy
        }
      };
    }
    case NEW_NOTIFICATION: {
      let notificationsCopy = state.profile.notifications.map(item => item);
      notificationsCopy.push(action.payload);
      return {
        ...state,
        profile: {
          ...state.profile,
          notifications: notificationsCopy
        }
      };
    }
    case CLEAR_CURRENT_PROFILE: {
      return {
        ...state,
        profile: {},
        isLoaded: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
