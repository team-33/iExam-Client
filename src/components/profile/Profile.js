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
import axios from "axios";
import {GET_USER_PROFILE_DATA} from "../../URL";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        axios.get(GET_USER_PROFILE_DATA).then((res) => {
            this.setState({user: res.data});
        });
    }

    state = {
        align: 'center',
        anchorEl: null,
        user: '',
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
        this.props.history.push('/users/profile/settings')
    };

    render() {
        const {anchorEl, user} = this.state;
        return (
            <div>
                <Grid container>
                    <Grid item xs={2}/>
                    <Grid item xs={8} style={{textAlign: this.state.align}}>

                        <Fade
                            in={user === undefined}
                            unmountOnExit
                            onExited={() => this.setState({align: 'left'})}
                        >
                            <CircularProgress/>
                        </Fade>

                        <Fade in={user !== undefined}
                              style={{
                                  transitionDelay: user !== undefined ? '800ms' : '0ms',
                              }}>
                            <Card>
                                <CardHeader
                                    avatar={<Avatar src={user.photo}/>}
                                    action={
                                        <IconButton
                                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.handleClick}
                                        >
                                            <MoreVertIcon/>
                                        </IconButton>
                                    }
                                    title={user.given_name + ' ' + user.family_name}
                                    subheader={user.email}
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
    };
}

export default connect(mapStateToProps, actions)(Profile);