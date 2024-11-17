import {call} from 'redux-saga/effects';
import authServices from './api';
import type {PayloadAction} from '@reduxjs/toolkit';
import {takeLatest} from 'redux-saga/effects';
import {authActions} from './reducer';
import {all} from 'redux-saga/effects';
import {GlobalModalController} from 'components/GlobalModal';

function* authSaga() {
  yield all([
    takeLatest(authActions.registerRequest.type, handleUserRegistrationSaga),
    takeLatest(authActions.loginRequest.type, handleUserLoginSaga),
  ]);
}

function* handleUserRegistrationSaga(
  action: PayloadAction<RegisterPayload>,
): any {
  try {
    const response = yield call(authServices.register, action.payload);
    console.log(response);
  } catch (error: any) {
    GlobalModalController.show({
      header: 'Lỗi',
      message: error.data.message,
    });
  }
}

function* handleUserLoginSaga(action: PayloadAction<LoginPayload>): any {
  try {
    const response = yield call(authServices.login, action.payload);
  } catch (error) {}
}
export default authSaga;
