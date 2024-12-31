import Reactotron, {networking, openInEditor} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
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

console.tron = reactotron;

export default reactotron;
