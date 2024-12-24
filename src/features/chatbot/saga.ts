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
    takeLatest(chatbotActions.getThreadChat.type, handleGetThreadChatSaga),
    takeLatest(
      chatbotActions.getThreadMessage.type,
      handleGetThreadMessageSaga,
    ),
    takeLatest(chatbotActions.createNewThread.type, handleCreateNewThreadSaga),
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

function* handleGetThreadChatSaga(
  action: PayloadAction<any>,
): Generator<any, void, any> {
  console.log('handleGetThreadChatSaga', action.payload);
  try {
    const response: any = yield call(
      ChatbotService.getThread,
      action.payload.data.id,
    );
    yield put(chatbotActions.getThreadChatSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(chatbotActions.getThreadChatFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleGetThreadMessageSaga(
  action: PayloadAction<any>,
): Generator<any, void, any> {
  console.log('handleGetThreadMessageSaga', action.payload);
  try {
    const response: any = yield call(
      ChatbotService.getMessageThreadChat,
      action.payload.id,
    );
    yield put(chatbotActions.getThreadMessageSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(chatbotActions.getThreadMessageFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleCreateNewThreadSaga(
  action: PayloadAction<any>,
): Generator<any, void, any> {
  console.log('handleCreateNewThreadSaga', action.payload);
  try {
    GlobalLoadingController.show();
    const response: any = yield call(
      ChatbotService.createNewThreadChat,
      action.payload.data,
    );
    yield put(chatbotActions.createNewThreadSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(chatbotActions.createNewThreadFailure(error.message));
    action.payload.action?.onFailure?.(error);
  } finally {
    GlobalLoadingController.hide();
  }
}

export default chatbotSaga;
