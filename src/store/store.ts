import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sageMiddleware = createSagaMiddleware();

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(sageMiddleware);

const store = configureStore({
  reducer: {},
  middleware: middleware,
});

sageMiddleware.run(rootSaga);

export default store;
