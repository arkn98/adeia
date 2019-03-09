import { CLEAR_ERRORS } from '../actionTypes';

// clear all errors set due to some event
const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS, payload: {} });
};

export default clearErrors;
