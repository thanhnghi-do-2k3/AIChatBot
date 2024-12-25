import {createStackNavigator} from '@react-navigation/stack';
import ScreenName from 'constant/ScreenName';
import ProfileScreen from 'screens/ProfileScreen';
import SubscriptionScreen from 'screens/SubcriptionScreen';

const Stack = createStackNavigator<any>();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.ProfileScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ScreenName.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen
        name={ScreenName.SubcriptionScreen}
        component={SubscriptionScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
