import type {PayloadAction} from '@reduxjs/toolkit';
import {GlobalLoadingController} from 'components/GlobalLoading';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import ChatbotService from './api';
import {chatbotActions} from './reducer';

function* chatbotSaga() {
  yield all([
    takeLatest(chatbotActions.createChatbot.type, handleCreateChatbotSaga),
    takeLatest(chatbotActions.getChatbot.type, handleGetChatbotSaga),
    takeLatest(chatbotActions.deleteChatbot.type, handleDeleteChatbotSaga),
    takeLatest(chatbotActions.updateChatbot.type, handleUpdateChatbotSaga),
  ]);
}

function* handleCreateChatbotSaga(
  action: PayloadAction<CreateChatBotPayload>,
): Generator<any, void, any> {
  console.log('handleCreateChatbotSaga', action.payload);
  try {
    GlobalLoadingController.show();
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
  } finally {
    GlobalLoadingController.hide();
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

function* handleDeleteChatbotSaga(
  action: PayloadAction<any>,
): Generator<any, void, any> {
  console.log('handleDeleteChatbotSaga', action.payload);
  try {
    GlobalLoadingController.show();
    const response: any = yield call(
      ChatbotService.deleteChatBot,
      action.payload.data.id,
    );
    yield put(chatbotActions.deleteChatbotSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(chatbotActions.deleteChatbotFailure(error.message));
    action.payload.action?.onFailure?.(error);
  } finally {
    GlobalLoadingController.hide();
  }
}

function* handleUpdateChatbotSaga(
  action: PayloadAction<any>,
): Generator<any, void, any> {
  console.log('handleUpdateChatbotSaga', action.payload);
  try {
    GlobalLoadingController.show();
    const response: any = yield call(
      ChatbotService.updateChatBot,
      action.payload.id,
      action.payload.data,
    );
    yield put(chatbotActions.updateChatbotSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(chatbotActions.updateChatbotFailure(error.message));
    action.payload.action?.onFailure?.(error);
  } finally {
    GlobalLoadingController.hide();
  }
}

export default chatbotSaga;
