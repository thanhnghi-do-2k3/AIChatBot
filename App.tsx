/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import GlobalConfirmModal from 'components/GlobalConfirmModal';
import GlobalLoading from 'components/GlobalLoading';
import GlobalModal from 'components/GlobalModal';
import {CodePushConfig} from 'config/CodePush';
import ApplicationNavigator from 'navigation/index';
import React, {useEffect, useRef} from 'react';
import {AppState, LogBox, type AppStateStatus} from 'react-native';
import CodePush from 'react-native-code-push';
import ErrorBoundary from 'react-native-error-boundary';
// import LottieSplashScreen from 'react-native-lottie-splash-screen';
import {Provider as PaperProvider} from 'react-native-paper';
import {enableScreens} from 'react-native-screens';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ErrorScreen from 'screens/ErrorScreen';
import {persistor, store} from 'store/store';
import {isIOS} from 'util/device';
import './global.css';

LogBox.ignoreAllLogs();
enableScreens();

const staging = false;

const index = staging ? 'staging' : 'production';

const CodePushKey = isIOS()
  ? CodePushConfig.ios[index]
  : CodePushConfig.android[index];

function App(): React.JSX.Element {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // LottieSplashScreen.hide();

    const appListenSub = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appListenSub.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    console.log('appState', appState.current, nextAppState);
    if (
      appState.current.match(/inactive|background|unknown/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      CodePush.sync(
        {
          installMode:
            CodePush.InstallMode.ON_NEXT_RESUME ||
            CodePush.InstallMode.ON_NEXT_SUSPEND,
          deploymentKey: CodePushKey,
          rollbackRetryOptions: {
            delayInHours: 1,
            maxRetryAttempts: 100,
          },
        },
        async status => {
          switch (status) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
              console.log('Checking for updates');
              break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
              console.log('Downloading package');
              break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              console.log('Installing update');
              break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
              console.log('Update installed');
              break;
            case CodePush.SyncStatus.UP_TO_DATE:
              console.log('Up to date');
              break;
            default:
              break;
          }
        },
      );
    }

    appState.current = nextAppState;
  };

  const onCatch = (error: any, componentStack: string) => {
    console.log('error', error);
    console.log('componentStack', componentStack);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary FallbackComponent={ErrorScreen} onError={onCatch}>
          {/* <GestureHandlerRootView> */}
          <PaperProvider>
            <ApplicationNavigator />
          </PaperProvider>
          <GlobalLoading />
          <GlobalModal />
          <GlobalConfirmModal />
          <Toast
            topOffset={60}
            autoHide
            bottomOffset={60}
            visibilityTime={1000}
          />
        </ErrorBoundary>
        {/* </GestureHandlerRootView> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
