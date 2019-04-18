import axios from 'axios';

import {
  PAPER_LIST,
} from './types';
  import { GET_PAPERS_API } from '../URL';

export const getPapers = () =>{
  return async dispatch => {
    const res = await axios.get( GET_PAPERS_API );
    dispatch({
        type: PAPER_LIST,
        payload: res.data
    });
  }
}
