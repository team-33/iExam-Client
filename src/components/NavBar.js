import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {Avatar} from "@material-ui/core";

import * as actions from '../actions';
import axios from "axios";
import {GET_USER_PROFILE_DATA} from "../URL";

const styles = {
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
    }
};

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        axios.get(GET_USER_PROFILE_DATA).then((res) => {
            this.setState({user: res.data});
        });
    }

    state = {
        user: ''
    };

    signOut = () => {
        this.props.signOut();
        // this.props.history.push('/');
    };

    toggleDrawer = state => () => {
        if (this.props.isAuth)
            this.props.toggleDrawer(state);
    };

    onClickHome = () => {
        this.props.history.push(this.props.isAuth ? '/home' : '/');
    };

    onClickProfile = () => {
        this.props.history.push('/users/profile');
    };

    onHeadingHover = state => () => {
        this.setState({headingHover: state});
    };

    render() {
        const {user} = this.state;
        return (
            <div style={{flexGrow: 1}}>
                <AppBar position='fixed'>
                    <Toolbar>
                        <IconButton color='inherit' aria-label="Menu" style={{marginLeft: -20, marginRight: 0}}
                                    onClick={this.toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <div style={{flexGrow: 1}}>
                            <Button
                                color='inherit'
                                style={styles.heading}
                                onClick={this.onClickHome}>
                                iExamr
                            </Button>
                        </div>
                        {!this.props.isAuth ?
                            <Link className="nav-link" to="/signup" style={{color: 'white', textDecoration: 'none'}}>
                                <Button color='inherit'>
                                    Sign up
                                </Button>
                            </Link>
                            : null}

                        {!this.props.isAuth ?
                            <Link className="nav-link" to="/signin" style={{color: 'white', textDecoration: 'none'}}>
                                <Button color='inherit'>
                                    Sign in
                                </Button>
                            </Link>
                            : null}

                        {this.props.isAuth && user ?
                            <IconButton onClick={this.onClickProfile}>
                                <Avatar src={user.photo}/>
                            </IconButton>
                            : null}

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, actions)(withRouter(NavBar));
