import { combineReducers } from 'redux';

import authReducer from './auth';
import papersReducer from './papers';
import appReducer from './app';

export default combineReducers({
  auth: authReducer,
  papers: papersReducer,
  app: appReducer
});
