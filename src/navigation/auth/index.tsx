import {createStackNavigator} from '@react-navigation/stack';
import {ScreenName} from '../../constants';
import LoginScreen from 'screens/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen';
import LoginWithGoogleScreen from 'screens/LoginWithGoogleScreen';
import VerifyEmailScreen from 'screens/VerifyEmailScreen';
import ChangePasswordScreen from 'screens/ChangePasswodScreen';

const Stack = createStackNavigator<any>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.Login}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ScreenName.Login} component={LoginScreen} />
      <Stack.Screen name={ScreenName.Register} component={RegisterScreen} />
      <Stack.Screen
        name={ScreenName.LoginWithGoogle}
        component={LoginWithGoogleScreen}
      />
      <Stack.Screen
        name={ScreenName.VerifyEmailScreen}
        component={VerifyEmailScreen}
      />
      <Stack.Screen
        name={ScreenName.ChangePasswordScreen}
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
