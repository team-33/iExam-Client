import React from 'react';
import {connect} from 'react-redux';
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import Icons from "@material-ui/icons/Save";

import * as homeActions from '../actions/papers';

class Notifications extends React.Component {

    render() {
        return (
            <div>
                <p>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <Icons/>
                            </ListItemIcon>
                            <ListItemText style={{}}>
                                sdasdsa
                            </ListItemText>
                        </ListItem>
                    </List>
                </p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, homeActions)(Notifications);
