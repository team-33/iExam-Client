import React, { Component } from 'react';

export default (OriginalComponent) => {

  class AuthManager extends Component {

    checkAuth() {
      var jwt_token = localStorage.getItem('jwt');
      if (!jwt_token) {
        this.props.history.push('/');

      }
    }

    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    render() {
      return <OriginalComponent />;
    }
  }

  return AuthManager;
};
