/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './global.css';
import ApplicationNavigator from 'navigation/index';
import React from 'react';
import {LogBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <ApplicationNavigator />
    </PaperProvider>
  );
}

export default App;
