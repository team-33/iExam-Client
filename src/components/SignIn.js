import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import {GOOGLE_SIGN_IN_API} from '../URL'

const responseGoogle = (response) => {
console.log(GOOGLE_SIGN_IN_API);
console.log(process.env);
axios.post(GOOGLE_SIGN_IN_API,{access_token: response.accessToken})
.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
})
}


export default class SignIn extends React.Component {

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
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  />
              </Paper>
            </Grid>
          </Grid>
        </div>

          // <div style=>
          //   <div className="row">
          //     <div className="col"></div>
          //     <div className="col text-center">
          //       <div className="card" style={{width:"18rem",margin:'auto',marginTop:"20px"}}>
          //         <div className="card-body">
          //           <h5 className="card-title">Login With Google</h5>
          //           <p className="card-text">One click login with google.</p>
          //             <GoogleLogin
          //              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          //              buttonText="Login"
          //              onSuccess={responseGoogle}
          //              onFailure={responseGoogle}
          //              cookiePolicy={'single_host_origin'}
          //             />
          //       </div>
          //       </div>

          //     </div>
          //   </div>
          // </div>
      )
  }
}
