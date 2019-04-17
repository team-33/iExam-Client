import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
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

export default connect(mapStateToProps, null)(Home);
