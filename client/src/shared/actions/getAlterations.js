import axios from 'axios';
import { GET_ALTERATIONS } from '../actionTypes';

const getAlterations = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/alteration/get-alterations')
      .then(res => {
        dispatch({ type: GET_ALTERATIONS, payload: res.data });
        resolve();
      })
      .catch(err => {
        dispatch({ type: GET_ALTERATIONS, payload: [] });
        reject();
      });
  });
};

export default getAlterations;
