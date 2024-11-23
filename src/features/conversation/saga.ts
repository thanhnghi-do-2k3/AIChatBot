import type {PayloadAction} from '@reduxjs/toolkit';
import {GlobalLoadingController} from 'components/GlobalLoading';
import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';

import conversationService from './api';

import {conversationActions} from './reducer';

function* conversationSaga() {
  yield all([
    takeLatest(
      conversationActions.fetchConversationsRequest.type,
      fetchConversations,
    ),
  ]);
}

function* fetchConversations(): any {
  try {
    const response = yield call(conversationService.fetchConversations);
    yield put(conversationActions.fetchConversationsSuccess(response));
  } catch (error) {
    yield put(conversationActions.fetchConversationsFailure());
  }
}

export default conversationSaga;
