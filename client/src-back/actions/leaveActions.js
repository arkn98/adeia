import axios from 'axios';
import { GET_LEAVE, GET_ERRORS } from './types';
import isEmpty from '../validation/is-empty';

export const addLeave = (data, history) => dispatch => {
  axios
    .post('/api/leaves/add-leave', data)
    .then(res => history.push('./dashboard'))
    .catch(err => {
      if (!isEmpty(err.response))
        return dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
