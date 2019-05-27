import React from 'react';
import GoogleLogin from 'react-google-login';
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux';
import PasswordStrengthBar from "react-password-strength-bar";
import {Button, Paper, TextField, Tooltip, Typography, Checkbox, FormControlLabel} from "@material-ui/core";
import SignUpIcon from "@material-ui/icons/HowToReg";
import {withSnackbar} from 'notistack';


import * as actions from '../actions';

class SignUp extends React.Component {

    state = {
        user: {
            email: '',
            family_name: '',
            given_name: '',
            password: '',
        },
        errors: {
            email: false,
            emailHelperText: '',
            password: false,
            passwordHelperText: '',
        },
        passwordAgain: '',
        passwordScore: 0,
        agreed: false,
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

    onSignUp = async event => {
        event.preventDefault();
        let valid = true;
        if (!this.validateEmail(this.state.user.email)) {

            this.handleClickVariant('Email not in correct format!');
            await this.setState({
                errors: {
                    ...this.state.errors,
                    email: true,
                    emailHelperText: 'Email is incorrect!'
                }
            });
            valid = false;
        }

        if (!this.validatePassword(this.state.user.password)) {

            this.handleClickVariant('Password is not good!');
            await this.setState({
                errors: {
                    ...this.state.errors,
                    password: true,
                    passwordHelperText: 'password is not enough good!'
                }
            });
            valid = false;
        } else if (!this.validatePasswordMatch()) {
            this.handleClickVariant('Password are not Matching!');
            valid = false;
        }

        if (valid) {
            await this.props.signUp(this.state.user);
            if (!this.props.errorMessage) {
                this.props.history.push('/');
            }
        }
    };

    handleClickVariant = message => {
        this.props.enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000});
    };

    validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    validatePassword = password => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    validatePasswordMatch = () => this.state.passwordAgain === this.state.user.password;

    onKeyPressNames = event => {
        if (!event.key.match(/[A-Za-z]/)) event.preventDefault();
    };

    onTextChange = event => this.setState({user: {...this.state.user, [event.target.name]: event.target.value}});

    onChangeCheckBox = event => this.setState({agreed: event.target.checked});

    onChangeScore = score => this.setState({passwordScore: score});

    onFocus = event =>
        this.setState({
            errors: {
                ...this.state.errors,
                [event.target.name]: false,
                [event.target.name + 'HelperText']: '',
            }
        });

    render() {
        return (
            <Grid container style={{marginTop: 30}}>
                <Grid item xs={12} sm={6}>
                    <Paper style={{
                        padding: '60px 20px',
                        margin: 20,
                        textAlign: 'center',
                    }}>
                        <form onSubmit={this.onSignUp}>
                            <Typography variant={'h5'}>
                                Sign up with email
                            </Typography>
                            <TextField
                                type={'email'}
                                label={"Email"}
                                name={'email'}
                                required
                                fullWidth
                                helperText={this.state.errors.emailHelperText}
                                error={this.state.errors.email}
                                value={this.state.user.email}
                                onChange={this.onTextChange}
                                onFocus={this.onFocus}/>
                            <Tooltip
                                title={'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'}
                                disableHoverListener>
                                <TextField
                                    type={'password'}
                                    label={"Password"}
                                    name={'password'}
                                    required
                                    fullWidth
                                    helperText={this.state.errors.passwordHelperText}
                                    error={this.state.errors.password}
                                    onChange={this.onTextChange}
                                    value={this.state.user.password}
                                    onFocus={this.onFocus}/>
                            </Tooltip>
                            <PasswordStrengthBar
                                password={this.state.user.password}
                                onChangeScore={this.onChangeScore}
                            />

                            <TextField
                                type={'password'}
                                label={"Password again"}
                                name={'passwordAgain'}
                                required
                                fullWidth
                                error={this.state.user.password !== this.state.passwordAgain}
                                helperText={this.state.user.password !== this.state.passwordAgain ? 'Doesn\'t match!' : 'match!'}
                                onChange={e => {
                                    this.setState({passwordAgain: e.target.value})
                                }}
                                value={this.state.passwordAgain}
                            />
                            <TextField
                                type={'text'}
                                label={"First Name"}
                                required
                                fullWidth
                                name={'given_name'}
                                value={this.state.user.given_name}
                                onKeyPress={this.onKeyPressNames}
                                onChange={this.onTextChange}
                            />
                            <TextField
                                type={'text'}
                                required
                                label={"Last Name"}
                                name={'family_name'}
                                fullWidth
                                value={this.state.user.family_name}
                                onKeyPress={this.onKeyPressNames}
                                onChange={this.onTextChange}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    required
                                    checked={this.state.agreed}
                                    onChange={this.onChangeCheckBox}
                                />}
                                label={"I Accept the Terms And Conditions"}/>

                            <br/><br/>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                type={"submit"}>
                                <SignUpIcon/>
                                Sign up
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
                            Sign up using third party service
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

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default connect(mapStateToProps, actions)(withSnackbar(SignUp));
