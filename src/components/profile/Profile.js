import React from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {Card, CardHeader, CircularProgress, IconButton} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import * as actions from "../../actions";
import Fade from "@material-ui/core/Fade";
import {object} from "prop-types";

class Profile extends React.Component {

    state ={
        align:'center',
    };

    render() {
        const {profile} = this.props;
        return (
            <Grid container>
                <Grid item xs={2}/>
                <Grid item xs={8} style={{textAlign: this.state.align}}>

                    <Fade
                        in={profile.email === undefined}
                        unmountOnExit
                        onExited={() => this.setState({align:'left'})}
                        >
                        <CircularProgress/>
                    </Fade>

                    <Fade in={profile.email !== undefined}
                          style={{
                              transitionDelay: profile.email !== undefined ? '800ms' : '0ms',
                          }}>
                        <Card>
                            <CardHeader
                                avatar={<Avatar src={profile.photo}/>}
                                action={
                                    <IconButton>
                                        <MoreVertIcon/>
                                    </IconButton>
                                }
                                title={profile.given_name + ' ' + profile.family_name}
                                subheader={profile.email}
                            />
                        </Card>
                    </Fade>
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