import axios from 'axios';

import {
    PAPER_LIST,
    PAPER_ERROR,
    INSERT_PAPER,
} from './types';
import {
    GET_PAPERS_API,
    INSERT_PAPER_API
} from '../URL';

export const getPapers = () => {
    return async dispatch => {
        try {
            const res = await axios.get(GET_PAPERS_API);
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
};

export const insertPaper = data => {
    return async dispatch => {
        try {
            var res = await axios.post(INSERT_PAPER_API,data);
            dispatch({
                type: INSERT_PAPER,
                payload: res.data,
            });
        } catch (e) {
            dispatch({
                type: PAPER_ERROR,
                payload: e.message,
            });
        }
    }
};
