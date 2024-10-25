/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import ApplicationNavigator from 'navigation/index';
import React from 'react';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  return <ApplicationNavigator />;
}

export default App;
