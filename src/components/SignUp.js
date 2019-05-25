import React from 'react';
import GoogleLogin from 'react-google-login';
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux';
import PasswordStrengthBar from "react-password-strength-bar";
import {Button, Paper, TextField, Tooltip, Typography, Checkbox, FormControlLabel} from "@material-ui/core";
import SignUpIcon from "@material-ui/icons/HowToReg";

import * as actions from '../actions';

class SignUp extends React.Component {

    state = {
        email: '',
        family_name: '',
        given_name: '',
        password: '',
        passwordAgain: '',
        agreed: false,
    };

    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle = async res => {
        await this.props.oauthGoogle(res.accessToken);
        if (!this.props.errorMessage && this.props.errorMessage !== '') {
            this.props.history.push('/');
        }
    };

    onSignUp = event => {
        event.preventDefault();
        console.log(this.state);
    };

    onKeyPressNames = event => {
        if (!event.key.match(/[A-Za-z]/)) event.preventDefault();
    };

    onTextChange = event => this.setState({[event.target.name]: event.target.value});

    onChangeCheckBox = event => this.setState({agreed: event.target.checked});

    render() {
        return (
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Paper style={{
                        padding: 20,
                        margin: 20,
                        textAlign: 'center',
                        height: '400px',
                    }}>
                        <Typography variant={'h5'}>
                            Sign up with email
                        </Typography>
                        <TextField
                            type={'email'}
                            label={"Email"}
                            required
                            name={'email'}
                            helperText={this.state.email === "" || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email) ? "" : "Enter an valid email"}
                            error={this.state.email !== "" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)}
                            onChange={this.onTextChange}
                            value={this.state.email}
                            fullWidth
                        />
                        <Tooltip
                            title={'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'}
                            disableHoverListener
                        >
                            <TextField
                                type={'password'}
                                label={"Password"}
                                required
                                fullWidth
                                error={!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(this.state.password)}
                                name={'password'}
                                onChange={this.onTextChange}
                                value={this.state.password}
                            />
                        </Tooltip>
                        <PasswordStrengthBar password={this.state.password}/>
                        <TextField
                            type={'password'}
                            label={"Password again"}
                            name={'passwordAgain'}
                            required
                            fullWidth
                            error={this.state.password !== this.state.passwordAgain}
                            helperText={this.state.password !== this.state.passwordAgain ? 'Doesn\'t match!' : 'match!'}
                            onChange={this.onTextChange}
                            value={this.state.passwordAgain}
                        />
                        <TextField
                            type={'text'}
                            label={"First Name"}
                            required
                            fullWidth
                            name={'given_name'}
                            value={this.state.given_name}
                            onKeyPress={this.onKeyPressNames}
                            onChange={this.onTextChange}
                        />
                        <TextField
                            type={'text'}
                            required
                            label={"Last Name"}
                            name={'family_name'}
                            fullWidth
                            value={this.state.family_name}
                            onKeyPress={this.onKeyPressNames}
                            onChange={this.onTextChange}
                        />
                        <FormControlLabel control={<Checkbox
                            required
                            checked={this.state.agreed}
                            onChange={this.onChangeCheckBox}
                        />}
                                          label={"I Accept the Terms And COnditions"}/>

                        <br/><br/>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            type={"submit"}
                            onClick={this.onSignUp}>
                            <SignUpIcon/>
                            Sign up
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={{
                        padding: 20,
                        margin: 20,
                        textAlign: 'center',
                        height: '400px',
                    }}>
                        <Typography variant={"h5"} component={"h3"}>
                            Sign in using third party service
                        </Typography>
                        <br/><br/>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Sign up with Google"
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

export default connect(null, actions)(SignUp);
