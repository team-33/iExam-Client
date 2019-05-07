import React from 'react';
import GoogleLogin from 'react-google-login';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux';

import * as actions from '../actions';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle = async res => {
      await this.props.oauthGoogle(res.accessToken);
      if (!this.props.errorMessage && this.props.errorMessage !== '') {
        this.props.history.push('/');
      }
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
                  Sign In using third Party Service
                </h4>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Signup with Google"
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

export default connect(null,actions)(SignUp);
