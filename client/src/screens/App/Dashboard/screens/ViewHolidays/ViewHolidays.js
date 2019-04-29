import React, { Fragment, Component } from 'react';
import { Form, SectionLabel } from 'screens/App/shared/common/FormInput';
import { AltTable } from 'screens/App/shared/common/Table';
import styles from './ViewHolidays.module.scss';
import dayjs from 'dayjs';

class ViewHolidays extends Component {
  state = {
    errors: {},
    holidays: []
  };

  componentDidMount = () => {
    this.props.updateCurrentRouteTitle(this.props.pageTitle);
    this.props.getAllHolidays().then(() => {
      this.setState({
        ...this.state,
        holidays: this.props.holidays.holidayList
          .filter(x => x.holidayType === this.props.holidayType)
          .map(item => ({ ...item }))
      });
    });
  };

  render = () => {
    return (
      <Fragment>
        <Form onSubmit={null} showBottomSpace={true}>
          <SectionLabel
            containerStyles={styles.marginBottom20}
            label={this.props.holidayTypeLabel}
          />
          <AltTable
            thead={[
              {
                value: 'Date',
                style: { width: '150px', maxWidth: '150px', flex: '150 0 auto' }
              },
              {
                value: 'Description',
                style: { width: '100px', flex: '100 0 auto' }
              }
            ]}
            containerStyles={styles.marginBottom20}
            tbody={this.state.holidays.map((item, index) => {
              return [
                {
                  value: dayjs(item.date).format(item.format),
                  style: {}
                },
                {
                  value: item.description,
                  style: {}
                }
              ];
            })}
          />
        </Form>
      </Fragment>
    );
  };
}

export default ViewHolidays;
