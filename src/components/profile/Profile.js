import React from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {
    Card,
    CardHeader,
    CircularProgress,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import * as actions from "../../actions";


import Fade from "@material-ui/core/Fade";

class Profile extends React.Component {

    state = {
        align: 'center',
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
        this.props.history.push('/users/profile/settings')
    };

    render() {
        const {anchorEl} = this.state;
        const {profile} = this.props;
        return (
            <div>
                <Grid container>
                    <Grid item xs={2}/>
                    <Grid item xs={8} style={{textAlign: this.state.align}}>

                        <Fade
                            in={profile.email === undefined}
                            unmountOnExit
                            onExited={() => this.setState({align: 'left'})}
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
                                        <IconButton
                                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.handleClick}
                                        >
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
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary={"Settings"}/>

                    </MenuItem>
                </Menu>
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

export default connect(mapStateToProps, actions)(Profile);