import type {PayloadAction} from '@reduxjs/toolkit';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import aiChatService from './api';
import {aiChatActions} from './reducer';

function* aiChatSaga() {
  yield all([
    takeLatest(aiChatActions.sendMessageRequest.type, handleSendMessageSaga),
    takeLatest(
      aiChatActions.getOldChatHistoryRequest.type,
      handleGetOldChatHistorySaga,
    ),
  ]);
}

function* handleSendMessageSaga(action: PayloadAction<AiChatPayload>): any {
  const payload = action.payload;
  try {
    const response: AiChatResponse = yield call(
      aiChatService.sendMessage,
      payload.data,
    );
    //console.log('Saga received response:', response);
    yield put(aiChatActions.sendMessageSuccess(response));
  } catch (error: any) {
    yield put(aiChatActions.sendMessageFailure(error.message));
  }
}

function* handleGetOldChatHistorySaga(action: PayloadAction<any>) {
  try {
    const response: AiChatHistoryResponse = yield call(
      aiChatService.getOldChatHistory,
      action.payload,
    );
    console.log('Saga received response:', response);
    yield put(aiChatActions.getOldChatHistorySuccess(response));
  } catch (error: any) {
    yield put(aiChatActions.getOldChatHistoryFailure(error.message));
  }
}

export default aiChatSaga;
