import AppHeader from 'components/AppHeader';
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {prod} from 'services/http.service';
import {reduxStorage} from 'store/store';

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
        `;
        setLocalStorageScript(script);
      }
    };

    fetchTokens();
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
      />
      <WebView
        ref={webViewRef}
        webviewDebuggingEnabled
        sharedCookiesEnabled
        domStorageEnabled
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
  },
  webview: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SubscriptionScreen;
