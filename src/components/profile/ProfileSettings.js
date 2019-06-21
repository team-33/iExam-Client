import React from 'react';
import {connect} from 'react-redux';

import * as actions from "../../actions";
import {Button, ListItem, ListItemText} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {
    DELETE_USER_PROFILE,
    GET_USER_PROFILE_DATA,
    UPDATE_USER
} from './../../URL';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/es/TextField/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

class ProfileSettings extends React.Component {

    state = {
        open: false,
        user: ''
    };

    componentDidMount() {
        axios.get(GET_USER_PROFILE_DATA)
            .then(res => this.setState({user: res.data}))
            .catch(e => console.log(e))
    }

    toggleDeleteConfirmDialog = state => this.setState({open: state});

    onClickDelete = e => {
        axios.delete(DELETE_USER_PROFILE).then(res => {
            if (res.status === 200) this.props.signOut();
        }).catch(e => {
            alert('error')
        });
        this.toggleDeleteConfirmDialog(false)
    };

    onUpdate = () => {
        axios.post(UPDATE_USER, this.state.user).then(res => {
            this.props.history.push('/users/profile');
        }).catch(e => {

        })
    };

    onTextChange = field => async e =>
        this.setState({user: {...this.state.user, [field]: e.target.value}});


    render() {
        return (
            <div>
                {this.state.user !== "" ?
                    <Paper style={{padding: 10}}>
                        <div style={{textAlign: 'center'}}>
                            <h3>Edit Profile details</h3>
                        </div>
                        <TextField
                            style={{width: '45%', margin: '0 2%'}}
                            label={"First Name"}
                            value={this.state.user.given_name}
                            onChange={this.onTextChange('given_name')}
                        />
                        <TextField
                            style={{width: '45%', margin: '0 2%'}}
                            label={"Last Name"}
                            value={this.state.user.family_name}
                            onChange={this.onTextChange('family_name')}
                        />
                        <div style={{textAlign: 'right', margin: "20px 35px"}}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                onClick={() => this.onUpdate()}>
                                Update
                            </Button>
                        </div>
                    </Paper> : <div style={{textAlign: 'center'}}><CircularProgress/></div>}
                <br/>
                <ListItem style={{
                    borderRadius: 10,
                    boxShadow: 'grey 3px 3px 5px'
                }}>
                    <ListItemText>
                        Delete account permanently.
                    </ListItemText>
                    <Button
                        color={"secondary"}
                        variant={"contained"}
                        onClick={() => this.toggleDeleteConfirmDialog(true)}
                    >
                        Delete my account
                    </Button>
                </ListItem>
                <Dialog open={this.state.open} onClose={() => this.toggleDeleteConfirmDialog(false)}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Delete my account</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your Account will be delete permanently.You cannot recover your account again.Are you sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.toggleDeleteConfirmDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.onClickDelete()} color="secondary"
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
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

export default connect(mapStateToProps, actions)(withRouter(withRouter(ProfileSettings)));