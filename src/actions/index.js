import axios from 'axios';

import {
    AUTH_SIGN_UP,
    AUTH_SIGN_OUT,
    TOGGLE_DRAWER,
    AUTH_USER,
    AUTH_ERROR,
    AUTH_SIGN_IN,
} from './types';
import {
    GOOGLE_SIGN_IN_API,
    GET_USER_PROFILE_DATA,
    LOCAL_SIGN_IN_API,
    LOCAL_SIGN_UP_API,
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

export const signUp = data => {
    return async dispatch => {
        try {
            const res = await axios.post(LOCAL_SIGN_UP_API, data);

            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use'
            })
        }
    };
}

export const signIn = data => {
    return async dispatch => {
        try {
            const res = await axios.post(LOCAL_SIGN_IN_API, data);

            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email and password combination isn\'t valid'
            })
        }
    };
}

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
