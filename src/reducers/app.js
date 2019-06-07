import {
    TOGGLE_DRAWER,
    AUTH_USER,
} from '../actions/types';

const DEFAULT_STATE = {
    isDrawerOpen: false,
    user: '',
    errorMessage:'',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return {...state, isDrawerOpen: action.payload};
        case AUTH_USER:
            return {...state, user: action.payload, errorMessage: ''};
        default:
            return state
    }
}
