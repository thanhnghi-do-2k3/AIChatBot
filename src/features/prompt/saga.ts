import type {PayloadAction} from '@reduxjs/toolkit';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import promptService from './api';
import {promptActions} from './reducer';

function* promptSaga() {
  yield all([
    
    takeLatest(promptActions.getPrompts.type, handleGetPromptsSaga),
    
  ]);
}



function* handleGetPromptsSaga(
  action: PayloadAction<GetUnitsKbPayload>,
): Generator<any, void, any> {
  console.log('handleGetUnitsKbSaga', action.payload);
  try {
    const response: any = yield call(promptService.getPrompts, action.payload.data);
    yield put(promptActions.getPromptsSuccess(response));
    action.payload.action?.onSuccess?.(response.items || []);
  } catch (error: any) {
    console.log('error', error);
    yield put(promptActions.getPromptsFailure(error.message));
    action.payload.action?.onFailure?.(error);
  }
}



export default promptSaga;
