/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import GlobalConfirmModal from 'components/GlobalConfirmModal';
import GlobalLoading from 'components/GlobalLoading';
import GlobalModal from 'components/GlobalModal';
import ApplicationNavigator from 'navigation/index';
import React from 'react';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'store/store';
import './global.css';

LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <ApplicationNavigator />
          <GlobalLoading />
          <GlobalModal />
          <GlobalConfirmModal />
          <Toast
            topOffset={60}
            autoHide
            bottomOffset={60}
            visibilityTime={1000}
          />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
