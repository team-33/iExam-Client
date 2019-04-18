import {
  PAPER_LIST,
  PAPER_ERROR,
 } from '../actions/types';

const DEFAULT_STATE = {
  papers:[],
  errMessage:''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case PAPER_LIST:
      return { ...state, papers: action.payload, errorMessage: '' }
    case PAPER_ERROR:
      return { ...state, papers: [], errorMessage: action.payload }
  default:
      return state
  }
}
