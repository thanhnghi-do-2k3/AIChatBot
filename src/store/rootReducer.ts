import authReducer from 'features/auth/reducer';
import chatReducer from 'features/chat/reducer';
import chatbotReducer from 'features/chatbot/reducer';
import conversationReducer from 'features/conversation/reducer';
import otherReducer from 'features/other/reducer';
import kbReducer from 'features/KB/reducer';
import emailReducer from 'features/email/reducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  // Add reducers here
  authReducer,
  otherReducer,
  chatReducer,
  conversationReducer,
  chatbotReducer,
  kbReducer,
  emailReducer,
});
