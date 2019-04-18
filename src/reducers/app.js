import {
TOGGLE_DRAWER
 } from '../actions/types';

const DEFAULT_STATE = {
  isDrawerOpen:false
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case TOGGLE_DRAWER:
      return { ...state, isDrawerOpen: action.payload }
    default:
      return state
  }
}
