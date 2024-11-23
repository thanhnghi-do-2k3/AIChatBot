import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ScreenName from 'constant/ScreenName';
import ChatHisToryScreen from 'screens/ChatHistoryScreen';
import ChatScreen from 'screens/ChatScreen';

const Stack = createStackNavigator();

const ChatNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.ChatScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenName.ChatHisToryScreen}
        component={ChatHisToryScreen}
      />
      <Stack.Screen name={ScreenName.ChatScreen} component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
