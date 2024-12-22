import authSaga from 'features/auth/saga';
import chatSaga from 'features/chat/saga';
import chatbotSaga from 'features/chatbot/saga';
import conversationSaga from 'features/conversation/saga';
import kbSaga from 'features/KB/saga';
import emailSaga from 'features/email/saga';
import {all, fork} from 'redux-saga/effects';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(chatSaga),
    fork(conversationSaga),
    fork(chatbotSaga),
    fork(kbSaga),
    fork(emailSaga),
  ]);
}

export default rootSaga;
