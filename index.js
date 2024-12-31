/**
 * @format
 */
import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (__DEV__) {
  require('./ReactotronConfig');
}

// Disable font scaling globally
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// Set global font family
const globalStyle = {fontFamily: 'SFProRegular'};

const applyGlobalFont = defaultStyle => ({
  ...defaultStyle,
  ...globalStyle,
});

// Apply font styles globally
Text.defaultProps.style = applyGlobalFont(Text.defaultProps.style);
TextInput.defaultProps.style = applyGlobalFont(TextInput.defaultProps.style);

AppRegistry.registerComponent(appName, () => App);
