import {
  PAPER_LIST,
 } from '../actions/types';

const DEFAULT_STATE = {
  papers:[],
  errMessage:''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case PAPER_LIST:
      return { ...state, papers: action.payload, errorMessage: '' }
    default:
      return state
  }
}
