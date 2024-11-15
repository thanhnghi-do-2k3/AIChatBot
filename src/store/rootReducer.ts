import {combineReducers} from 'redux';
import authReducer from 'features/auth/reducer';

export const rootReducer = combineReducers({
  // Add reducers here
  authReducer,
});
