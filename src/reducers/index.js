import { combineReducers } from 'redux';

import authReducer from './auth';
import papersReducer from './papers';

export default combineReducers({
  auth: authReducer,
  papers: papersReducer
});
