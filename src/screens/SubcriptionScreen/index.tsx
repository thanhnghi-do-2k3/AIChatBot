import AppHeader from 'components/AppHeader';
import {GlobalConfirmModalController} from 'components/GlobalConfirmModal';
import React, {useEffect, useState} from 'react';
import {
  InteractionManager,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import {prod} from 'services/http.service';
import {reduxStorage} from 'store/store';

export const injectJavascriptInitDimension = `
const meta = document.createElement("meta");
meta.setAttribute("content", "width=width, height=height, initial-scale=1, maximum-scale=1, user-scalable=2.0");
meta.setAttribute("name", "viewport");
document.getElementsByTagName("head")[0].appendChild(meta);
`;

const SubscriptionScreen = ({navigation}: any) => {
  const [localStorageScript, setLocalStorageScript] = useState('');
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const webViewRef = React.createRef<WebView>();

  useEffect(() => {
    const fetchTokens = async () => {
      const token = await reduxStorage.getItem('accessToken');
      const refreshToken = await reduxStorage.getItem('refreshToken');

      setToken(token);
      setRefreshToken(refreshToken);

      if (token && refreshToken) {
        // Set the script only after token and refreshToken are available
        const script = `
          (function() {
            localStorage.setItem('jarvis_cx_app_token', '${token}');
            localStorage.setItem('jarvis_cx_app_refresh_token', '${refreshToken}');
            return true;
            })();
          ${injectJavascriptInitDimension}
        `;

        setLocalStorageScript(script);
      }
    };

    fetchTokens();

    let interval: NodeJS.Timeout;

    InteractionManager.runAfterInteractions(() => {
      interval = setInterval(() => {
        GlobalConfirmModalController.show({
          header: 'Can not process ?',
          message: 'Your subcription button can not process? ',
          onConfirm: () => {
            Linking.openURL('https://admin.jarvis.cx/pricing/overview');
          },
        });
      }, 1000 * 60 * 2);
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!token || !refreshToken) {
    // Show a loading screen or a placeholder while waiting for tokens
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        headerTitle="Subscription"
        onPressLeftHeader={() => {
          navigation.goBack();
        }}
        // paddingTop={0}
      />
      <WebView
        style={styles.webview}
        ref={webViewRef}
        // webviewDebuggingEnabled
        // sharedCookiesEnabled
        // domStorageEnabled
        source={{
          uri: prod
            ? 'https://admin.jarvis.cx/pricing/overview'
            : 'https://admin.dev.jarvis.cx/pricing/overview',
        }}
        javaScriptEnabled={true}
        injectedJavaScript={localStorageScript}
        onMessage={event => {
          console.log('Message from WebView:', event.nativeEvent.data);
        }}
        onContentProcessDidTerminate={(event: any) => {
          console.log('onContentProcessDidTerminate', event);
          if (Platform.OS === 'ios') {
            event.preventDefault();
            webViewRef.current?.reload();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // overflow: 'visible',
  },
  webview: {
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    flex: 1,
    height: '100%',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SubscriptionScreen;
