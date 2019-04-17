import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT
 } from '../actions/types';

const DEFAULT_STATE = {
  isAuthenticated:false,
  token:'',
  errMessage:''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case AUTH_SIGN_UP:
      return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' }
    case AUTH_SIGN_OUT:
      return { ...state, token: action.payload, isAuthenticated: false, errorMessage: '' }
    default:
      return state
  }
}
