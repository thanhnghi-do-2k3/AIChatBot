import authReducer from 'features/auth/reducer';
import chatReducer from 'features/chat/reducer';
import conversationReducer from 'features/conversation/reducer';
import otherReducer from 'features/other/reducer';
import promptReducer from 'features/prompt/reducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  // Add reducers here
  authReducer,
  otherReducer,
  chatReducer,
  conversationReducer,
  promptReducer,
});
