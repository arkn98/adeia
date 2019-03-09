import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';
import App from '../App';

const mapStateToProps = state => ({
  auth: state.auth,
  utils: state.utils
});

const appContainer = connect(
  mapStateToProps,
  { logoutUser }
)(App);

export default withRouter(appContainer);
