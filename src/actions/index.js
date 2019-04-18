import axios from 'axios';

import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  TOGGLE_DRAWER,
} from './types';
  import {GOOGLE_SIGN_IN_API} from '../URL';

export const oauthGoogle = data =>{
  return async dispatch => {
    const res = await axios.post(GOOGLE_SIGN_IN_API,{
      access_token: data
    });

    localStorage.setItem('JWT_TOKEN',res.data.token);
    axios.defaults.headers.common['Authorization'] = res.data.token;

    dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token
    });
  }
}

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ''
    })
  };
}

export const toggleDrawer = state => {
  return dispatch => {

    dispatch({
      type: TOGGLE_DRAWER,
      payload: state,
    })
  };
}
