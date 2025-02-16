import type {PayloadAction} from '@reduxjs/toolkit';
import {GlobalLoadingController} from 'components/GlobalLoading';
import reactotron from 'reactotron-react-native';
import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {reduxStorage} from 'store/store';
import authService from './api';
import {authActions} from './reducer';

function* authSaga() {
  yield all([
    takeLatest(authActions.registerRequest.type, handleUserRegistrationSaga),
    takeLatest(authActions.loginRequest.type, handleUserLoginSaga),
    takeEvery(authActions.logoutRequest.type, handleUserLogoutSaga),
    takeEvery(authActions.getCurrentUser.type, handleGetCurrentUserSaga),
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

    const response_kb = yield call(authService.loginForKB, {
      token: response?.token?.accessToken,
    });

    console.log('response_kb', response_kb);

    // Setup token
    reduxStorage.setItem('accessToken_KB', response_kb?.token?.accessToken);
    reduxStorage.setItem('refreshToken_KB', response_kb?.token?.refreshToken);

    yield put(authActions.getCurrentUser({}));

    yield put(authActions.loginSuccess(response));
    payload.action?.onSuccess?.(response);
  } catch (error) {
    reactotron && reactotron.log('error', error);
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
    reduxStorage.removeItem('accessToken');
    reduxStorage.removeItem('refreshToken');
    yield put(authActions.logoutSuccess({}));
    payload.action?.onSuccess?.();
  } catch (error) {
    yield put(authActions.logoutFailure(error));
    payload.action?.onFailure?.(error);
  } finally {
    GlobalLoadingController.hide();
  }
}

function* handleGetCurrentUserSaga(action: PayloadAction<any>): any {
  const payload = action.payload;
  try {
    payload.action?.onBegin?.();
    const response = yield call(authService.getCurrentUser);

    console.log('response', response);

    yield put(authActions.getCurrentUserSuccess(response));
    payload.action?.onSuccess?.(response);
  } catch (error) {
    yield put(authActions.getCurrentUserFailure(error));
    payload.action?.onFailure?.(error);
  }
}
export default authSaga;
