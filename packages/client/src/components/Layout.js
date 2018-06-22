import React, { Component } from 'react';
import Header from './Header';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionsCreators from '../actions/actionsCreators';

const mapStateToProps = state => ({
  talks: state.talks,
  rooms: state.rooms,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actionsCreators.talks,
      ...actionsCreators.rooms,
    },
    dispatch,
  );

class Dashboard extends Component {
  render() {
    const { Component } = this.props;
    return (
      <div>
        <Header />
        <div className="bg-grey-lighter py-2 flex">
          <div className="w-full w-1/2">
            <p className="flex justify-center">
              <span className="mx-2">
                Total de charlas {this.props.talks.total}
              </span>
              <span className="mx-2">
                Total en minutos {this.props.talks.totalHours}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full md:w-5/6 flex justify-center pt-4">
            <Component {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
