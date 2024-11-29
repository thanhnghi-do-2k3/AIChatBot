import {all, fork} from 'redux-saga/effects';
import authSaga from 'features/auth/saga';
import chatSaga from 'features/chat/saga';
import conversationSaga from 'features/conversation/saga';

function* rootSaga() {
  yield all([fork(authSaga)]);
  yield all([fork(chatSaga)]);
  yield all([fork(conversationSaga)]);
}

export default rootSaga;
