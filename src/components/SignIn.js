import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios'
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
          <div>
            <GoogleLogin
             clientId="15159349202-q9pb863s3noj04ceqp6k7q0tmrce77h4.apps.googleusercontent.com"
             buttonText="Login"
             onSuccess={responseGoogle}
             onFailure={responseGoogle}
             cookiePolicy={'single_host_origin'}
            />
          </div>
      )
  }
}
