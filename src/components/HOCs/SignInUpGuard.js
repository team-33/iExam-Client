import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OriginalComponent) => {

  class SignInUpGuard extends Component {

    checkAuth() {
      if (this.props.isAuth && this.props.jwtToken) {
        this.props.history.push('/home');
      }
    }

    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      jwtToken: state.auth.token
    }
  }

  return connect(mapStateToProps)(SignInUpGuard);
};
