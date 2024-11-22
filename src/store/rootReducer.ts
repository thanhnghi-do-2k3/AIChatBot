import {combineReducers} from 'redux';
import authReducer from 'features/auth/reducer';
import otherReducer from 'features/other/reducer';
import chatReducer from 'features/chat/reducer';
import conversationReducer from 'features/conversation/reducer';

export const rootReducer = combineReducers({
  // Add reducers here
  authReducer,
  otherReducer,
  chatReducer,
  conversationReducer,
});
