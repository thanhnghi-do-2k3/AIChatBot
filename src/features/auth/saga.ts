import type {PayloadAction} from '@reduxjs/toolkit';
import {GlobalLoadingController} from 'components/GlobalLoading';
import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {reduxStorage} from 'store/store';
import authService from './api';
import {authActions} from './reducer';

function* authSaga() {
  yield all([
    takeLatest(authActions.registerRequest.type, handleUserRegistrationSaga),
    takeLatest(authActions.loginRequest.type, handleUserLoginSaga),
    takeEvery(authActions.logoutRequest.type, handleUserLogoutSaga),
  ]);
}

function* handleUserRegistrationSaga(
  action: PayloadAction<RegisterPayload>,
): any {
  const payload = action.payload;
  GlobalLoadingController.show();
  try {
    payload.action?.onBegin?.();
    GlobalLoadingController.show();
    const response = yield call(authService.register, payload.data);
    payload.action?.onSuccess?.(response);
    yield put(authActions.registerSuccess(response));
  } catch (error: any) {
    payload.action?.onFailure?.(error);
    yield put(authActions.registerFailure(error));
  }
  GlobalLoadingController.hide();
}

function* handleUserLoginSaga(action: PayloadAction<LoginPayload>): any {
  const payload = action.payload;
  GlobalLoadingController.show();
  try {
    payload.action?.onBegin?.();
    const response = yield call(authService.login, payload.data);

    // Setup token
    reduxStorage.setItem('accessToken', response?.token?.accessToken);
    reduxStorage.setItem('refreshToken', response?.token?.refreshToken);

    yield put(authActions.loginSuccess(response));
    payload.action?.onSuccess?.(response);
  } catch (error) {
    yield put(authActions.loginFailure(error));
    payload.action?.onFailure?.(error);
  }
  GlobalLoadingController.hide();
}

function* handleUserLogoutSaga(action: PayloadAction<PayloadActions>): any {
  GlobalLoadingController.show();
  const payload = action.payload;
  try {
    payload.action?.onBegin?.();
    yield call(authService.logout);
    reduxStorage.removeItem('token');
    reduxStorage.removeItem('refreshToken');
    yield put(authActions.logoutSuccess({}));
    payload.action?.onSuccess?.();
  } catch (error) {
    yield put(authActions.logoutFailure(error));
    payload.action?.onFailure?.(error);
  }
  GlobalLoadingController.hide();
}
export default authSaga;
