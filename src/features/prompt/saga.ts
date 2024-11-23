import type {PayloadAction} from '@reduxjs/toolkit';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import promptService from './api';
import {promptActions} from './reducer';

function* promptSaga() {
  yield all([
    takeLatest(promptActions.getPrompts.type, handleGetPromptsSaga),
    takeLatest(
      promptActions.makeFavoritePrompt.type,
      handleMakeFavoritePromptSaga,
    ),
    takeLatest(promptActions.createPrompt.type, handleCreatePromptSaga),
    takeLatest(promptActions.deletePrompt.type, handleDeletePromptSaga),
    takeLatest(promptActions.updatePrompt.type, handleUpdatePromptSaga),
  ]);
}

function* handleGetPromptsSaga(
  action: PayloadAction<GetPromptsPayload>,
): Generator<any, void, any> {
  console.log('handleGetUnitsKbSaga', action.payload);
  try {
    const response: any = yield call(
      promptService.getPrompts,
      action.payload.data,
    );
    yield put(promptActions.getPromptsSuccess(response));
    action.payload.action?.onSuccess?.(response.items || []);
  } catch (error: any) {
    console.log('error', error);
    yield put(promptActions.getPromptsFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleCreatePromptSaga(
  action: PayloadAction<CreatePromptPayload>,
): Generator<any, void, any> {
  console.log('handleCreatePromptSaga', action.payload);
  try {
    const response: any = yield call(
      promptService.createPrompt,
      action.payload.data,
    );
    yield put(promptActions.createPromptSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(promptActions.createPromptFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleMakeFavoritePromptSaga(
  action: PayloadAction<MakeFavoritePromptPayload>,
): Generator<any, void, any> {
  console.log('handleMakeFavoritePromptSaga', action.payload);
  try {
    const response: any = yield call(
      promptService.makeFavoritePrompt,
      action.payload.data,
    );
    yield put(promptActions.makeFavoritePromptSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(promptActions.makeFavoritePromptFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleDeletePromptSaga(
  action: PayloadAction<DeletePromptPayload>,
): Generator<any, void, any> {
  console.log('handleDeletePromptSaga', action.payload);
  try {
    const response: any = yield call(
      promptService.deletePrompt,
      action.payload.data,
    );
    yield put(promptActions.deletePromptSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(promptActions.deletePromptFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleUpdatePromptSaga(
  action: PayloadAction<UpdatePromptPayload>,
): Generator<any, void, any> {
  console.log('handleUpdatePromptSaga', action.payload);
  try {
    const response: any = yield call(
      promptService.updatePrompt,
      action.payload.data,
    );
    yield put(promptActions.updatePromptSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(promptActions.updatePromptFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}



export default promptSaga;
