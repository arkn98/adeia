import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LeaveApplication from '../components/LeaveApplication';
import { connect } from 'react-redux';
import { getSlotsToAlternate } from '../actions/timetableActions';
import { addLeave } from '../actions/leaveActions';

class Container extends Component {
  state = {
    isLoading: true
  };

  componentDidMount = () => {
    let data = {
      staff: this.props.auth.user.id,
      dayRange: [1, 2, 3, 4, 5]
    };
    Promise.all([this.props.getSlotsToAlternate(data)]).then(() => {
      this.setState({ ...this.state, isLoading: false });
      const element = document.getElementById('spinnerContainer');
      if (element) {
        element.outerHTML = '';
      }
    });
  };

  render = () => {
    const { isLoading } = this.state;
    const props = this.props;
    if (isLoading) return null;
    else {
      let freeHours = [];
      for (let i = 1; i <= 5; ++i) {
        let temp = [];
        if (props.leave.toAlternate.findIndex(x => x.day === i) !== -1) {
          for (let j = 1; j <= 8; ++j) {
            if (
              props.leave.toAlternate.findIndex(
                x => x.day === i && j >= x.hour && j <= x.hour + x.duration - 1
              ) === -1
            ) {
              temp.push(j);
            }
          }
        } else {
          for (let k = 1; k <= 8; k++) temp.push(k);
        }
        freeHours.push(temp);
      }
      return (
        <LeaveApplication
          auth={props.auth}
          staff={props.staff}
          leave={props.leave}
          errors={props.errors}
          freeHours={freeHours}
          updateCurrentRouteTitle={props.updateCurrentRouteTitle}
          addLeave={props.addLeave}
          getSlotsToAlternate={props.getSlotsToAlternate}
          isDarkTheme={props.isDarkTheme}
        />
      );
    }
  };
}

Container.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  leave: PropTypes.object.isRequired,
  updateCurrentRouteTitle: PropTypes.func.isRequired,
  addLeave: PropTypes.func.isRequired,
  getSlotsToAlternate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  leave: state.leave
});

export default connect(
  mapStateToProps,
  {
    addLeave,
    getSlotsToAlternate
  }
)(withRouter(Container));
