import {call} from 'redux-saga/effects';
import authServices from './api';
import type {PayloadAction} from '@reduxjs/toolkit';
import {takeLatest} from 'redux-saga/effects';
import {authActions} from './reducer';
import {all} from 'redux-saga/effects';
import {put} from 'redux-saga/effects';

function* authSaga() {
  yield all([
    takeLatest(authActions.registerRequest.type, handleUserRegistrationSaga),
    takeLatest(authActions.loginRequest.type, handleUserLoginSaga),
  ]);
}

function* handleUserRegistrationSaga(
  action: PayloadAction<RegisterPayload>,
): any {
  const payload = action.payload;
  try {
    payload.action?.onBegin?.();
    const response = yield call(authServices.register, payload.data);
    payload.action?.onSuccess?.(response);
    // yield put(authActions.registerSuccess(response));
  } catch (error: any) {
    payload.action?.onFailure?.(error);
    // yield put(authActions.registerFailure(error));
  }
}

function* handleUserLoginSaga(action: PayloadAction<LoginPayload>): any {
  const payload = action.payload;
  try {
    payload.action?.onBegin?.();
    const response = yield call(authServices.login, payload.data);
    payload.action?.onSuccess?.(response);
    // yield put(authActions.loginSuccess(response));
  } catch (error) {
    payload.action?.onFailure?.(error);
    // yield put(authActions.loginFailure(error));
  }
}
export default authSaga;
