import React from 'react';
import AddUpdateClass from './AddUpdateClass';
import { connect } from 'react-redux';
import {
  updateCurrentRouteTitle,
  addClass,
  getAllClasses,
  updateClass
} from 'shared/actions';

const Container = props => {
  return <AddUpdateClass {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  classes: state.classes
});

export default connect(
  mapStateToProps,
  { updateCurrentRouteTitle, addClass, getAllClasses, updateClass }
)(Container);
