import axios from 'axios';

import {
    AUTH_SIGN_UP,
    AUTH_SIGN_OUT,
    TOGGLE_DRAWER,
    AUTH_USER,
} from './types';
import {
    GOOGLE_SIGN_IN_API,
    GET_USER_PROFILE_DATA,
} from '../URL';

export const oauthGoogle = data => {
    return async dispatch => {
        const res = await axios.post(GOOGLE_SIGN_IN_API, {
            access_token: data
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;

        await dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        });

        const userRes = await axios.get(GET_USER_PROFILE_DATA);

        await localStorage.setItem('USER', JSON.stringify(userRes.data));

        await dispatch({
            type: AUTH_USER,
            payload: userRes.data,
        });
    }
};

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');
        localStorage.removeItem('USER');
        axios.defaults.headers.common['Authorization'] = '';

        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        });

        dispatch({
            type: AUTH_USER,
            payload: ''
        })
    };
};

export const toggleDrawer = state => {
    return dispatch => {

        dispatch({
            type: TOGGLE_DRAWER,
            payload: state,
        })
    };
};

export const getUser = () => {
    return async dispatch => {
        const userRes = await axios.get(GET_USER_PROFILE_DATA);

        await localStorage.setItem('USER', userRes.data);
        dispatch({
            type: AUTH_USER,
            payload: userRes.data,
        })
    };
};
