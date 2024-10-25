import {createStackNavigator} from '@react-navigation/stack';
import {ScreenName} from '../../constants';
import LoginScreen from 'screens/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen';

const Stack = createStackNavigator<any>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.Login}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ScreenName.Login} component={LoginScreen} />
      <Stack.Screen name={ScreenName.Register} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
