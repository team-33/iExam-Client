import React from 'react';
import GoogleLogin from 'react-google-login';
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux';
import {Button, Paper, TextField, Typography} from "@material-ui/core";
import SignUpIcon from "@material-ui/icons/HowToReg";
import {withSnackbar} from 'notistack';


import * as actions from '../actions';

class SignIn extends React.Component {

    state = {
        user: {
            email: '',
            password: '',
        },
    };

    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.handleClickVariant = this.handleClickVariant.bind(this);
    }

    responseGoogle = async res => {
        await this.props.oauthGoogle(res.accessToken);
        if (!this.props.errorMessage && this.props.errorMessage !== '') {
            this.props.history.push('/');
        }
    };

    onSignIn = async event => {
        event.preventDefault();
        await this.props.signIn(this.state.user);
        if (!this.props.errorMessage) {
            this.props.history.push('/');
        } else {
            this.handleClickVariant("Username or Password incorrect!")
        }
    };

    handleClickVariant = message => {
        this.props.enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000});
    };

    onTextChange = event => this.setState({user: {...this.state.user, [event.target.name]: event.target.value}});

    render() {
        return (
            <Grid container style={{marginTop: 30}}>
                <Grid item xs={12} sm={6}>
                    <Paper style={{
                        padding: '60px 20px',
                        margin: 20,
                        textAlign: 'center',
                    }}>
                        <form onSubmit={this.onSignIn}>
                            <Typography variant={'h5'}>
                                Sign in with email
                            </Typography>
                            <TextField
                                type={'email'}
                                label={"Email"}
                                name={'email'}
                                required
                                fullWidth
                                value={this.state.user.email}
                                onChange={this.onTextChange}
                            />

                            <TextField
                                type={'password'}
                                label={"Password"}
                                name={'password'}
                                required
                                fullWidth
                                value={this.state.user.password}
                                onChange={this.onTextChange}
                            />
                            <br/><br/>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                type={"submit"}>
                                <SignUpIcon/>
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={{
                        padding: '60px 20px',
                        margin: 20,
                        textAlign: 'center',
                    }}>
                        <Typography variant={"h5"} component={"h3"}>
                            Sign in using third party service
                        </Typography>
                        <br/><br/>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Sign in with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default connect(mapStateToProps, actions)(withSnackbar(SignIn));
