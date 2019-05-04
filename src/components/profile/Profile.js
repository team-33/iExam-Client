import React from 'react';
import {connect} from 'react-redux';
import * as actions from "../../actions";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import {Typography} from "@material-ui/core";

const styles = {
    avatar: {
        width: '70px',
        height: '70px',
    },
    paper: {
        padding: '20px 10px'
    }
};

class Profile extends React.Component {

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        const {profile} = this.props;
        return (
            <Grid container>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <Paper style={styles.paper}>
                            <Avatar style={styles.avatar} src={profile.photo}/>
                            Hiranth
                    </Paper>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated,
        profile: state.auth.user,
    };
}

export default connect(mapStateToProps, actions)(Profile);
