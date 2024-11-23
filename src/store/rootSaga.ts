import authSaga from 'features/auth/saga';
import chatSaga from 'features/chat/saga';

import conversationSaga from 'features/conversation/saga';

import promptSaga from 'features/prompt/saga';
import {all, fork} from 'redux-saga/effects';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(chatSaga),
    fork(conversationSaga),
    fork(promptSaga),
  ]);
}

export default rootSaga;
