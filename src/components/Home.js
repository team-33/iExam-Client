import React from 'react';
import { connect } from 'react-redux';

import * as homeActions from '../actions/home';

class Home extends React.Component {

  componentDidMount() {
    this.props.getPapers();
  }

  componentDidUpdate() {
    this.props.getPapers();
  }

    render() {
        return(
            <div>
              Dashboard
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, homeActions)(Home);
