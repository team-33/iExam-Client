import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_USER,
 } from '../actions/types';

const DEFAULT_STATE = {
  isAuthenticated:false,
  token:'',
  errMessage:'',
  user:''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case AUTH_SIGN_UP:
      return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' };
    case AUTH_SIGN_OUT:
      return { ...state, token: action.payload, isAuthenticated: false, errorMessage: '' };
    case AUTH_USER:
      return { ...state, user: action.payload, errorMessage: '' };
    default:
      return state
  }
}
