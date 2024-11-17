import {combineReducers} from 'redux';
import authReducer from 'features/auth/reducer';
import otherReducer from 'features/other/reducer';

export const rootReducer = combineReducers({
  // Add reducers here
  authReducer,
  otherReducer,
});
