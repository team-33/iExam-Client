import {combineReducers} from 'redux';

import authReducer from './auth';
import appReducer from './app';

export default combineReducers({
    auth: authReducer,
    app: appReducer
});
