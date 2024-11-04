import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import ScreenName from 'constant/ScreenName';
import EmailScreen from 'screens/EmailScreen';



const Stack = createStackNavigator();

const ChatNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.EmailScreen}
      screenOptions={{headerShown: false}}>
      

      <Stack.Screen name={ScreenName.EmailScreen} component={EmailScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
