import {configureStore} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';
import {persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import {Storage} from 'redux-persist/es/types';
import createSagaMiddleware from 'redux-saga';
import reactotron from '../../ReactotronConfig';
import {rootReducer} from './rootReducer';
import rootSaga from './rootSaga';

const sageMiddleware = createSagaMiddleware();

// Set up the middleware
const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }).concat(sageMiddleware);

// Configure the MKKV persist store
// Visit for more information: https://github.com/mrousavy/react-native-mmkv/blob/main/docs/WRAPPER_REDUX.md
const persist_store = new MMKV({
  id: 'persist_store',
  encryptionKey: 'persist_store_encryption_key',
});

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    persist_store.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = persist_store.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    persist_store.delete(key);
    return Promise.resolve();
  },
};

// Configure the redux persist
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['authReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
  enhancers: (getDefaultEnhancers: any) => {
    return getDefaultEnhancers().concat(
      __DEV__ ? reactotron.createEnhancer() : [],
    );
  },
});

const persistor = persistStore(store);

sageMiddleware.run(rootSaga);

export {persistor, store};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// This function is used to access the store outside of the react components
export const getStateReduxStore = (selector: any) => {
  try {
    return selector(store.getState());
  } catch (error) {
    return null;
  }
};

// This function is used to dispatch actions outside of the react components
export const dispatchReduxStore = (action: any) => {
  try {
    store.dispatch(action);
  } catch (error) {
    console.log('Error dispatching action', error);
  }
};
