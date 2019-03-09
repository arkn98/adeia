import axios from 'axios';
import { GET_ERRORS /* CLEAR_ERRORS */ } from './types';
import isEmpty from '../validation/is-empty';

export const addClass = (data, history) => dispatch => {
  axios
    .post('/api/admin/class/add', data)
    .then(res => history.push('/dashboard'))
    .catch(err => {
      if (!isEmpty(err.response))
        return dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const addCourse = (data, history) => dispatch => {
  axios
    .post('/api/admin/course/add', data)
    .then(res => history.push('/dashboard'))
    .catch(err => {
      if (!isEmpty(err.response))
        return dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
