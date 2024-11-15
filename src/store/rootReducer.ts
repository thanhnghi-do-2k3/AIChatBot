import {combineReducers} from 'redux';
import authReducer from 'features/auth/reducer';

const rootReducer = combineReducers({
  // Add reducers here
  authReducer,
});
