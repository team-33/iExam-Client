import React from 'react';
import {connect} from 'react-redux';

import * as actions from "../../actions";

class ProfileSettings extends React.Component {


    render() {
        return (
            <div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated,
        profile: state.auth.user,
    };
}

export default connect(mapStateToProps, actions)(ProfileSettings);