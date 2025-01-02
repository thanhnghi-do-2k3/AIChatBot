import type {PayloadAction} from '@reduxjs/toolkit';
import {GlobalLoadingController} from 'components/GlobalLoading';

import {all, call, put, take, takeLatest} from 'redux-saga/effects';
import kbService from './api';
import {kbActions} from './reducer';

function* kbSaga() {
  yield all([
    takeLatest(kbActions.createKb.type, handleCreateKbSaga),
    takeLatest(kbActions.getKb.type, handleGetKbSaga),
    takeLatest(kbActions.getUnitsKb.type, handleGetUnitsKbSaga),
    takeLatest(kbActions.addUrlToKb.type, handleAddUrlToKbSaga),
    takeLatest(kbActions.deleteKb.type, handleDeleteKbSaga),
    takeLatest(kbActions.addLocalFileToKb.type, handleAddLocalFileToKbSaga),
    takeLatest(kbActions.addSlackToKb.type, handleAddSlackToKbSaga),
    takeLatest(kbActions.addConfluenceToKb.type, handleAddConfluenceToKbSaga),
  ]);
}

function* handleCreateKbSaga(
  action: PayloadAction<CreateKbPayload>,
): Generator<any, void, any> {
  console.log('handleCreateKbSaga', action.payload);
  GlobalLoadingController.show();
  try {
    const response: any = yield call(kbService.createKb, action.payload.data);
    yield put(kbActions.createKbSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(kbActions.createKbFailure(error?.message));
    action.payload.action?.onFailure?.(error);
  } finally {
    GlobalLoadingController.hide();
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
    yield put(kbActions.getKbFailure(error?.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleDeleteKbSaga(
  action: PayloadAction<DeleteKbPayload>,
): Generator<any, void, any> {
  console.log('handleDeleteKbSaga', action.payload);
  try {
    const response: any = yield call(kbService.deleteKb, action.payload.data);
    yield put(kbActions.deleteKbSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(kbActions.deleteKbFailure(error?.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleGetUnitsKbSaga(
  action: PayloadAction<GetUnitsKbPayload>,
): Generator<any, void, any> {
  console.log('handleGetUnitsKbSaga', action.payload);
  try {
    const response: any = yield call(kbService.getUnitsKb, action.payload.data);
    yield put(kbActions.getUnitsKbSuccess(response));
    action.payload.action?.onSuccess?.(response.data || []);
  } catch (error: any) {
    console.log('error', error);
    yield put(kbActions.getUnitsKbFailure(error?.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleAddUrlToKbSaga(
  action: PayloadAction<AddUrlToKbPayload>,
): Generator<any, void, any> {
  console.log('handleAddUrlToKbSaga', action.payload);
  try {
    const response: any = yield call(kbService.addUrlToKb, action.payload.data);
    yield put(kbActions.addUrlToKbSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(kbActions.addUrlToKbFailure(error?.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleAddLocalFileToKbSaga(
  action: PayloadAction<addLocalFileToKbPayload>,
): Generator<any, void, any> {
  console.log('handleAddLocalFileToKbSaga', action.payload);
  try {
    const response: any = yield call(
      kbService.addLocalFileToKb,
      action.payload.data,
    );
    yield put(kbActions.addLocalFileToKbSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(kbActions.addLocalFileToKbFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }

  
}

function* handleAddSlackToKbSaga(
  action: PayloadAction<addSlackToKbPayload>,
): Generator<any, void, any> {
  console.log('handleAddSlackToKbSaga', action.payload);
  try {
    const response: any = yield call(kbService.addSlackToKb, action.payload.data);
    yield put(kbActions.addSlackToKbSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(kbActions.addSlackToKbFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

function* handleAddConfluenceToKbSaga(
  action: PayloadAction<addConfluenceToKbPayload>,
): Generator<any, void, any> {
  console.log('handleAddConfluenceToKbSaga', action.payload);
  try {
    const response: any = yield call(
      kbService.addConfluenceToKb,
      action.payload.data,
    );
    yield put(kbActions.addConfluenceToKbSuccess(response));
    action.payload.action?.onSuccess?.(response);
  } catch (error: any) {
    console.log('error', error);
    yield put(kbActions.addConfluenceToKbFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

export default kbSaga;
