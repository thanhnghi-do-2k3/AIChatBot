import type {PayloadAction} from '@reduxjs/toolkit';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import ChatbotService from './api';
import {chatbotActions} from './reducer';

function* chatbotSaga() {
  yield all([
    takeLatest(chatbotActions.createChatbot.type, handleCreateChatbotSaga),
    takeLatest(chatbotActions.getChatbot.type, handleGetChatbotSaga),
  ]);
}

function* handleCreateChatbotSaga(
  action: PayloadAction<CreateChatBotPayload>,
): Generator<any, void, any> {
  console.log('handleCreateChatbotSaga', action.payload);
  try {
    const response: any = yield call(
      ChatbotService.createChatBot,
      action.payload.data,
    );
    yield put(chatbotActions.createChatbotSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(chatbotActions.createChatbotFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleGetChatbotSaga(
  action: PayloadAction<any>,
): Generator<any, void, any> {
  console.log('handleGetChatbotSaga', action.payload);
  try {
    const response: any = yield call(ChatbotService.getChatBot);
    console.log('response', response);
    yield put(chatbotActions.getChatbotSuccess(response));
    action.payload.action?.onSuccess?.(response.data || []);
  } catch (error: any) {
    console.log('error', error);
    yield put(chatbotActions.getChatbotFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

export default chatbotSaga;
