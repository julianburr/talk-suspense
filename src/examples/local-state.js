import React, { PureComponent, Fragment } from 'react';
import api from '../api';

class Example extends PureComponent {
  state = {
    data: null,
    loading: true
  };

  componentDidMount () {
    const { user } = this.props;
    api.get(`/users/${user}`).then((response) => {
      this.setState({
        data: response.data,
        loading: false
      });
    });
  }

  render () {
    const { data, loading } = this.state;
    return (
      <Fragment>
        <h1>Example</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>{data.map((item) => <li>{item.name}</li>)}</ul>
        )}
      </Fragment>
    );
  }
}
