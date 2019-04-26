import React from 'react';
import {connect} from 'react-redux';
import * as actions from "../../actions";

class Profile extends React.Component {

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        console.log(this.props.profile);
        return(
            <div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated,
        profile:state.auth.user,
    };
}

export default connect(mapStateToProps, actions)(Profile);
