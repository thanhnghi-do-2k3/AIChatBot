import type {PayloadAction} from '@reduxjs/toolkit';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import kbService from './api';
import {kbActions} from './reducer';

function* kbSaga() {
  yield all([
    takeLatest(kbActions.createKb.type, handleCreateKbSaga),
    takeLatest(kbActions.getKb.type, handleGetKbSaga),
  ]);
}

function* handleCreateKbSaga(
  action: PayloadAction<CreateKbPayload>,
): Generator<any, void, any> {
  console.log('handleCreateKbSaga', action.payload);
  try {
    const response: any = yield call(kbService.createKb, action.payload.data);
    yield put(kbActions.createKbSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(kbActions.createKbFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleGetKbSaga(
  action: PayloadAction<any>,
): Generator<any, void, any> {
  console.log('handleGetChatbotSaga', action.payload);
  try {
    const response: any = yield call(kbService.getKb);
    console.log('response', response);
    yield put(kbActions.getKbSuccess(response));
    action.payload.action?.onSuccess?.(response.data || []);
  } catch (error: any) {
    console.log('error', error);
    yield put(kbActions.getKbFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

export default kbSaga;
