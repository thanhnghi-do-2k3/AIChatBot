import {createStackNavigator} from '@react-navigation/stack';
import ScreenName from 'constant/ScreenName';

import PromptListScreen from 'screens/PromptScreen';

const Stack = createStackNavigator<any>();

const PromptNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.PromptListScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenName.PromptListScreen}
        component={PromptListScreen}
      />
      
    </Stack.Navigator>
  );
};

export default PromptNavigation;