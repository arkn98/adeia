import Home from './Home';
import { connect } from 'react-redux';
import { logoutUser } from '../../../shared/actions';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.user.name
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);
