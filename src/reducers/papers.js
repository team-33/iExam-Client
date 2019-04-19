import {
  PAPER_LIST,
  PAPER_ERROR,
  INSERT_PAPER,
 } from '../actions/types';

const DEFAULT_STATE = {
  papers:[],
  errorMessage:''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case PAPER_LIST:
      return { ...state, papers: action.payload, errorMessage: '' };
    case INSERT_PAPER:
      state.papers.push(action.payload);
      return { ...state , errorMessage: '' };
    case PAPER_ERROR:
      return { ...state, papers: [], errorMessage: action.payload };
  default:
      return state
  }
}
