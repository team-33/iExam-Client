import axios from 'axios';

import {
  PAPER_LIST,
} from './types';
  import { GET_PAPERS_API } from '../URL';

export const getPapers = () =>{
  return async dispatch => {
    console.log(axios.defaults.headers);
    const res = await axios.get( GET_PAPERS_API );
    console.log(res);
    dispatch({
        type: PAPER_LIST,
        payload: res.data.papers
    });
  }
}
