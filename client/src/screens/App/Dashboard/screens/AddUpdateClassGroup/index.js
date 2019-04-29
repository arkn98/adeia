import React from 'react';
import AddUpdateClassGroup from './AddUpdateClassGroup';
import { connect } from 'react-redux';
import {
  updateCurrentRouteTitle,
  addClassGroup,
  updateClassGroup,
  getAllClassGroups
} from 'shared/actions';

const Container = props => {
  return <AddUpdateClassGroup {...props} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  classGroups: state.classGroups
});

export default connect(
  mapStateToProps,
  {
    updateCurrentRouteTitle,
    getAllClassGroups,
    addClassGroup,
    updateClassGroup
  }
)(Container);
