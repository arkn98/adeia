import React, { Fragment, Component } from 'react';
import { TextBox, SelectBox } from 'screens/App/shared/common/FormInput';
import { ButtonSubmit } from 'screens/App/shared/common/Button';
import styles from './AddCourse.module.scss';

class AddCourse extends Component {
  state = {
    isSubmitting: false,
    errors: {}
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        ...this.state,
        errors: nextProps.errors,
        isSubmitting: false
      });
    }
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(this.props.pageTitle);
  };

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render = () => {
    const { errors } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.formSubmitHandler}>
          <TextBox
            name="staffId"
            label="Staff ID"
            bigLabel={true}
            type="text"
            value={this.state.staffId}
            inputOnChangeHandler={this.inputOnChangeHandler}
            errors={errors.staffId}
            containerStyles={styles.marginBottom20}
          />
        </form>
      </Fragment>
    );
  };
}

export default AddCourse;
