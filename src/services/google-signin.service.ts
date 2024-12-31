import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import reactotron from '../../ReactotronConfig';

GoogleSignin.configure({
  webClientId:
    '599361404647-e74vpq6s2ab8q6r275s12sdhr36enq5l.apps.googleusercontent.com',
  // webClientId:
  //   '599361404647-e74vpq6s2ab8q6r275s12sdhr36enq5l.apps.googleusercontent.com',
  // iosClientId:
  //   '599361404647-e74vpq6s2ab8q6r275s12sdhr36enq5l.apps.googleusercontent.com',
});

export class GoogleSigninService {
  static signIn = async () => {
    reactotron.log('sign in');
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log('User signed in');
        console.log(response);
      } else {
        console.log('User cancelled sign in');
        // sign in was cancelled by user
      }
    } catch (error) {
      console.log('error', error);
      if (isErrorWithCode(error)) {
        console.log('error code', error.code);
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
}
