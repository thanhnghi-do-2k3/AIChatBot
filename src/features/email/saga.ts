import type {PayloadAction} from '@reduxjs/toolkit';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import EmailService from './api';
import {emailActions} from './reducer';

function* emailSaga() {
  yield all([
    //takeLatest(kbActions.createKb.type, handleCreateKbSaga),
    takeLatest(
      emailActions.getEmailSuggestion.type,
      handleGetEmailSuggestionSaga,
    ),
  ]);
}

// function* handleCreateKbSaga(
//   action: PayloadAction<CreateKbPayload>,
// ): Generator<any, void, any> {
//   console.log('handleCreateKbSaga', action.payload);
//   try {
//     const response: any = yield call(kbService.createKb, action.payload.data);
//     yield put(kbActions.createKbSuccess(response));
//     action.payload.action?.onSuccess?.(response);
//   } catch (error: any) {
//     console.log('error', error);
//     yield put(kbActions.createKbFailure(error.message));
//     action.payload.action?.onFailure?.(error);
//   }
// }

function* handleGetEmailSuggestionSaga(
  action: PayloadAction<any>,
): Generator<any, void, any> {
  console.log('handleGetChatbotSaga', action.payload);
  try {
    const response: any = yield call(
      EmailService.getEmailSuggestion,
      action.payload.data,
    );
    console.log('response', response);
    yield put(emailActions.getEmailSuggestionSuccess(response));
    action.payload.action?.onSuccess?.(response.ideas || []);
  } catch (error: any) {
    console.log('error', error);
    yield put(emailActions.getEmailSuggestionFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}

export default emailSaga;
