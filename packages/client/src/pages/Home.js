import React, { Component } from 'react';
import Layout from '../components/Layout';
import FormTalk from '../components/FormTalk';

class Home extends Component {
  componentDidMount() {
    this.props.fetchTalks({});
  }

  render() {
    return (
      <React.Fragment>
        <FormTalk {...this.props} />
      </React.Fragment>
    );
  }
}

export default () => <Layout Component={Home} />;
