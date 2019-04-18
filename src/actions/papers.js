import axios from 'axios';

import {
  PAPER_LIST,
  PAPER_ERROR,
} from './types';
  import { GET_PAPERS_API } from '../URL';

export const getPapers = () =>{
  return async dispatch => {
    try {
      const res = await axios.get( GET_PAPERS_API );
      dispatch({
          type: PAPER_LIST,
          payload: res.data
      });
    } catch (e) {
      dispatch({
          type: PAPER_ERROR,
          payload: e.message,
      });
    }
  }
}
