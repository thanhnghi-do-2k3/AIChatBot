import Reactotron from 'reactotron-react-native';
import {networking} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import {trackGlobalErrors} from 'reactotron-react-native';
import {openInEditor} from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron.configure()
  .useReactNative(
    networking({
      ignoreUrls: /symbolicate/,
    }),
  )
  .use(sagaPlugin())
  .use(networking())
  .use(reactotronRedux())
  .use(openInEditor())
  .connect();

console.tron = Reactotron;

export default reactotron;
