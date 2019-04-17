import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {withRouter} from 'react-router';

import {GOOGLE_SIGN_IN_API} from '../URL'

class SignIn extends React.Component {

responseGoogle = response => {
  axios.post(GOOGLE_SIGN_IN_API,{access_token: response.accessToken})
  .then(async (res) => {
    localStorage.setItem('jwt',res.data.token);
    axios.defaults.headers.common['Authorization'] = res.data.token;
    console.log(await axios.get('http://localhost:5000/auth/secret'));
    this.props.history.push('/dashboard');
  }).catch((err) => {
    console.log(err);
  })
}


  render() {
      return(

        <div style={{flexGrow:1}}>
          <Grid container>
            <Grid item xs={12} sm={6} style={{padding:10}}>
            </Grid>
            <Grid item xs={12} sm={6} style={{padding:10}}>
              <Paper style={{height:200,textAlign:'center',padding:20}}>
                <h4>
                  Sign In using third Party Methods
                </h4>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  />
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
  }
}

export default withRouter(SignIn);
