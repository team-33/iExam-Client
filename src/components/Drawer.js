import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import NoteIcon from '@material-ui/icons/Note';
import ExitIcon from '@material-ui/icons/ExitToApp';
import ProfileIcon from '@material-ui/icons/Person';
import NotificationIcon from '@material-ui/icons/Notifications';
import UsersIcon from '@material-ui/icons/People';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../actions';

class Drawer extends React.Component {

    toggleDrawer = state => () => {
        this.props.toggleDrawer(state);
    };

    signOut = () => this.props.signOut();


    render() {

        const sideList = (
            <div style={{width: 250}}>

                <List>
                    <Link to='/home' style={{textDecoration: 'none'}}>
                        <ListItem button key='home'>
                            <ListItemIcon><HomeIcon/></ListItemIcon>
                            <ListItemText primary='Home'/>
                        </ListItem>
                    </Link>

                    <Link to='/papers' style={{textDecoration: 'none'}}>
                        <ListItem button key='papers'>
                            <ListItemIcon><NoteIcon/></ListItemIcon>
                            <ListItemText primary='Papers'/>
                        </ListItem>
                    </Link>

                    <Link to='/users/profile' style={{textDecoration: 'none'}}>
                        <ListItem button key='profile'>
                            <ListItemIcon><ProfileIcon/></ListItemIcon>
                            <ListItemText primary='My profile'/>
                        </ListItem>
                    </Link>

                    <Link to='/users/all' style={{textDecoration: 'none'}}>
                        <ListItem button key='users'>
                            <ListItemIcon><UsersIcon/></ListItemIcon>
                            <ListItemText primary='Users'/>
                        </ListItem>
                    </Link>

                    <Link to='/notifications' style={{textDecoration: 'none'}}>
                        <ListItem button key='notifications'>
                            <ListItemIcon><NotificationIcon/></ListItemIcon>
                            <ListItemText primary='Notifications'/>
                        </ListItem>
                    </Link>


                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>

                <Divider/>
                {this.props.isAuth ?
                    < List>
                        < ListItem button key='signout' onClick={this.signOut}>
                            <ListItemIcon><ExitIcon/></ListItemIcon>
                            <ListItemText primary='Sign Out'/>
                        </ListItem>
                    </List>
                    : null}
            </div>
        );

        return (
            <div>
                <SwipeableDrawer
                    open={this.props.isOpen}
                    onClose={this.toggleDrawer(false)}
                    onOpen={this.toggleDrawer(true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isOpen: state.app.isDrawerOpen,
        isAuth: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, actions)(Drawer);
