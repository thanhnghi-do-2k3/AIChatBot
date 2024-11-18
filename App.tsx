/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import GlobalLoading from 'components/GlobalLoading';
import './global.css';
import ApplicationNavigator from 'navigation/index';
import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from 'store/store';
import {store} from 'store/store';
import GlobalModal from 'components/GlobalModal';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
        <GlobalLoading />
        <GlobalModal />
        <Toast topOffset={60} autoHide bottomOffset={60} />
      </PersistGate>
    </Provider>
  );
}

export default App;
